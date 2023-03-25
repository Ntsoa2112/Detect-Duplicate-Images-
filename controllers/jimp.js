const serviceJimp = require('../service/jimp.service');
const sourceDirectory = './files'
const destinationDirectory = './filesUnique'

module.exports = {
    hashDedblonnage: async (req, res) => {
        try {
            serviceJimp.hashDedoubonnageService(sourceDirectory, destinationDirectory)
                .then((message) => {
                    console.log(message);
                    res.send(message)
                })
                .catch((err) => {
                    console.error(err);
                });
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    pixelDedblonnage: async (req, res) => {
        try {
            serviceJimp.pixelDedoubonnageService(sourceDirectory, destinationDirectory)
                .then((message) => {
                    console.log(message);
                    res.send(message)
                })
                .catch((err) => {
                    console.error(err);
                });
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
}