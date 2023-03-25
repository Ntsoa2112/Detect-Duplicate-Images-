const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

module.exports = {
    hashDedoubonnageService: (sourceDirectory, destinationDirectory) => {
      return new Promise((resolve, reject) => {
        // Lecture du contenu du dossier source
        fs.readdir(sourceDirectory, (err, files) => {
          if (err) reject(err);
    
          // Utilisation d'un ensemble pour stocker les hachages uniques d'images
          const uniqueHashes = new Set();
          // Variable pour compter le nombre de fichiers copiés avec succès
          let copiedFiles = 0;
    
          // Boucle sur chaque fichier dans le dossier source
          files.forEach((file) => {
            const sourcePath = path.join(sourceDirectory, file);
            // Chargement de l'image courante avec Jimp
            Jimp.read(sourcePath, (err, image) => {
              if (err) reject(err);
    
              // Calcul du hachage de l'image et vérification de son unicité
              const hash = image.hash();
              if (uniqueHashes.has(hash)) {
                console.log(`${file} est un doublon`);
                // Incrémentation de la variable pour compter le nombre de fichiers copiés
                copiedFiles++;
    
                // Vérification si tous les fichiers ont été copiés
                if (copiedFiles === files.length) {
                  resolve('HASH ===> FIN DE TRAITEMENT');
                }
              } else {
                uniqueHashes.add(hash);
    
                // Copie du fichier vers le dossier de destination
                const destinationPath = path.join(destinationDirectory, file);
                fs.copyFile(sourcePath, destinationPath, (err) => {
                  if (err) reject(err);
                  console.log(`Copie de ${file} vers ${destinationDirectory}`);
                  // Incrémentation de la variable pour compter le nombre de fichiers copiés
                  copiedFiles++;
    
                  // Vérification si tous les fichiers ont été copiés
                  if (copiedFiles === files.length) {
                    resolve('HASH ===> FIN DE TRAITEMENT');
                  }
                });
              }
            });
          });
        });
      });
    },

    pixelDedoubonnageService: (sourceDirectory, destinationDirectory) => {
      return new Promise((resolve, reject) => {
        // Lecture du contenu du dossier source
        fs.readdir(sourceDirectory, (err, files) => {
          if (err) reject(err);
    
          // Utilisation d'un objet pour stocker les images et leurs hachages
          const images = {};
          // Variable pour compter le nombre de fichiers copiés avec succès
          let copiedFiles = 0;
    
          // Boucle sur chaque fichier dans le dossier source
          files.forEach((file) => {
            const sourcePath = path.join(sourceDirectory, file);
    
            // Chargement de l'image courante avec Jimp
            Jimp.read(sourcePath, (err, image) => {
              if (err) reject(err);
    
              // Calcul du hachage de l'image
              const hash = image.hash();
    
              if (images[hash]) {
                console.log(`${file} est un doublon`);
                // Incrémentation de la variable pour compter le nombre de fichiers copiés
                copiedFiles++;
    
                // Vérification si tous les fichiers ont été copiés
                if (copiedFiles === files.length) {
                  resolve('PIXEL ===> FIN DE TRAITEMENT');
                }
              } else {
                // Comparaison avec les images stockées dans l'objet images
                let isDuplicate = false;
                for (let existingHash in images) {
                  // Calcul du hachage de l'image et vérification de son unicité
                  /*La fonction Jimp.distance() de la bibliothèque Jimp permet de mesurer la différence entre deux images en utilisant une distance métrique. Elle calcule la distance euclidienne entre chaque pixel des deux images, c'est-à-dire la racine carrée de la somme des carrés des différences entre les valeurs RGB de chaque pixel.
                  La fonction prend en entrée deux instances de la classe Jimp représentant les deux images à comparer, et renvoie un nombre à virgule flottante compris entre 0 et 1, où 0 indique que les images sont identiques et 1 indique qu'elles sont complètement différentes.
                  Dans le code ci-dessous, image correspond à l'image courante chargée avec Jimp, et Jimp.read(uniqueHashes) est une méthode qui charge les images stockées dans l'ensemble uniqueHashes, qui contient les hachages des images uniques.
                  */
                  const distance = Jimp.distance(image, images[existingHash]);
                  if (distance < 0.05) {
                    console.log(`${file} est un doublon`);
                    isDuplicate = true;
                    break;
                  }
                }
    
                if (!isDuplicate) {
                  images[hash] = image;
    
                  // Copie du fichier vers le dossier de destination
                  const destinationPath = path.join(destinationDirectory, file);
                  fs.copyFile(sourcePath, destinationPath, (err) => {
                    if (err) reject(err);
                    console.log(`Copie de ${file} vers ${destinationDirectory}`);
                    // Incrémentation de la variable pour compter le nombre de fichiers copiés
                    copiedFiles++;
    
                    // Vérification si tous les fichiers ont été copiés
                    if (copiedFiles === files.length) {
                      resolve('PIXEL ===> FIN DE TRAITEMENT');
                    }
                  });
                } else {
                  // Incrémentation de la variable pour compter le nombre de fichiers copiés
                  copiedFiles++;
    
                  // Vérification si tous les fichiers ont été copiés
                  if (copiedFiles === files.length) {
                    resolve('PIXEL ===> FIN DE TRAITEMENT');
                  }
                }
              }
            });
          });
        });
      });
      
    },
}
