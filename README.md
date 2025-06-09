# APPLICATION MA PHARMACIE

L'application **Ma Pharmacie** permet de gérer des médicaments. Elle est consultable sur le site [https://aiolah.alwaysdata.net/pharmacie](https://aiolah.alwaysdata.net/pharmacie).
L'application est une Single Page Application (SPA), ce qui signifie que toutes les actions peuvent se réaliser sur la même page.

Les frameworks utilisés sont :

| Backend | Frontend |
| --- | --- |
| NodeJS | VueJS & Bootstrap |

Voici **comment utiliser l'application** :

## 1 - Ajouter un médicament
Pour ajouter un médicament, cliquez sur le bouton "Ajouter un médicament" en haut à gauche. Vous pouvez maintenant remplir le formulaire. Les champs "Nom", "Forme" et "Quantité" sont obligatoires.
Il y a plusieurs règles à respecter lors de l'ajout d'un médicament :
- La quantité minimale est 1, une quantité négative est impossible
- Le nouveau médicament ne doit pas déjà exister dans la pharmacie. Si c'est le cas, une erreur s'affiche.

Il est possible de renseigner une image grâce au champ fichier. Si aucun fichier n'est sélectionné, l'application affichera une image par défaut pour le nouveau médicament.

Cliquez sur "Enregistrer" pour ajouter le médicament dans l'application. Un message de confirmation s'affiche si l'ajout a fonctionné.

## 2 - Rechercher un médicament
Pour rechercher un médicament, renseignez son nom dans la barre de recherche. Cliquez ensuite sur l'icône loupe ou sur la touche "Entrée" pour afficher les résultats de la recherche. Pour fermer la recherche, cliquez sur l'icône croix apparue dans le champ.

## 3 - Augmenter la quantité d'un médicament
Pour augmenter la quantité d'un médicament, cliquez sur le bouton "+ 1".

## 4 - Réduire la quantité d'un médicament
Pour réduire la quantité d'un médicament, cliquez sur le bouton "- 1". La quantité minimale est 0. Un message s'affichera si vous tentez de réduire la quantité en-dessous de 0.

## 5 - Modifier un médicament
Pour modifier un médicament, cliquez sur l'icône crayon. Vous pouvez maintenant modifier le médicament grâce au formulaire. Les champs "Nom", "Forme" et "Quantité" sont obligatoires. La quantité minimale est 1. Si aucun fichier n'est sélectionné, l'application utilisera la précédente image du médicament. Si le médicament n'avait pas d'image spécifique, l'application affichera une image par défaut.
Cliquez sur "Enregistrer" pour sauvegarder les modifications. Un message de confirmation s'affiche si la modification a fonctionné.

## 6 - Ajouter une ordonnance
Pour ajouter une ordonnance à un médicament, cliquez sur l'icône fichier. Grâce au formulaire, vous pouvez maintenant renseigner une ordonnance. Les champs requis sont la date, le bénéficiaire, le docteur, la dose et la durée en jours. La case à cocher "Renouvellement" est optionnelle.
Cliquez sur "Enregistrer" pour lier l'ordonnance au médicament. Un message de confirmation s'affiche si l'ajout a fonctionné.

## 7 - Consulter et supprimer une ordonnance
Si une ordonnance existe pour un médicament, une icône comprimés s'affiche sur la ligne du médicament. Cliquez sur l'icône pour afficher l'ordonnance. Une fois l'ordonnance affichée, vous pouvez la supprimer en cliquant sur "Supprimer l'ordonnance". L'ordonnance sera supprimée mais pas le médicament.

*A savoir :* Les ordonnances sont gérées avec le **localStorage**. Cela signifie qu'elles seront persistantes après consultation du site. Par contre, si le localStorage lié au site est supprimé, les ordonnances le seront aussi.

## 8 - Supprimer un médicament

Pour supprimer un médicament, cliquez sur l'icône poubelle. Un message de confirmation s'affiche si la suppression est réussie.

---

**Important :** Il est impossible d'ajouter, modifier ou supprimer plusieurs médicaments en même temps. De même pour les ordonnances. Un seul formulaire s'affiche à la fois et les boutons "Modifier" et "Ordonnance" sont désactivés quand un formulaire lié à un médicament est affiché. Ils se réactivent quand le formulaire est fermé.