# Copyright 2022 <Votre nom et code permanent>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from flask import Flask
from flask import request
from flask import redirect
from flask import render_template
from flask import g
from database import Database
import random

app = Flask(__name__, static_url_path="", static_folder="static")
global nom
global espece
global race
global age
global description
global courriel
global adresse
global ville
global cp


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        g._database = Database()
    return g._database


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.disconnect()


def show_random(): 
    animauxRadom=[]
    db=get_db()
    animaux=db.get_animaux()
    i = 0
    while i < len(animaux) and i < 5:
        animauxRadom.append(db.get_animal(random.randrange(len(animaux))+1))
        i += 1
    return animauxRadom


@app.route('/')
def accueilRandom():
    animauxRandom=show_random()
    return render_template('index.html',animals=animauxRandom)


@app.route('/submit-recherche', methods=['POST'])
def recherche() :
    global especeChereche
    especeChereche=request.form['recherche']
    return redirect('/resultats-recherche')


@app.route('/resultats-recherche')
def resultat():
    liste_animal_recherche=[]
    animaux = get_db()
    liste_animaux = animaux.get_animaux()
    for animal in liste_animaux :
        if str(animal["espece"]).casefold() == str(especeChereche).casefold() :
            liste_animal_recherche.append(animal)
    return render_template('resul-rech.html', animals=liste_animal_recherche, espece=especeChereche.capitalize())


@app.route('/consultation')
def consultation():
    db = get_db()
    list_animaux = db.get_animaux()
    return render_template('consultation.html',animals=list_animaux)


@app.route('/animal-<id>')
def animal_recherche(id):
    animaux=get_db()
    animal = animaux.get_animal(id)
    return render_template('animal.html', animal=animal)


@app.route('/mise-en-adoption')
def form():
    return render_template('form.html')


@app.route('/submit-adoption', methods=['POST'])
def donnees_formulaire() :
    db = get_db()
    nom=request.form['nom']
    espece=request.form['espece']
    race=request.form['race']
    age=request.form['age']
    description=request.form['description']
    courriel=request.form['courriel']
    adresse=request.form['adresse']
    ville=request.form['ville']
    cp=request.form['cp']
    db.add_animal(nom,espece.capitalize(),race,age,description,courriel,adresse,ville,cp)
    return redirect('/animal-cree')


@app.route('/animal-cree')
def animal_cree():
    animaux=get_db()
    liste_animaux = animaux.get_animaux()
    dernierAnimal = liste_animaux[-1]
    id=dernierAnimal['id']
    animalAjoute=animaux.get_animal(id)
    return render_template('animal.html',animal=animalAjoute)


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


@app.errorhandler(400)
def bad_request(e):
    return render_template('400.html'), 400
