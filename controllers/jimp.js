const serviceJimp = require('../service/jimp.service');
const sourceDirectory = './files'
const destinationDirectory = './filesUnique'

module.exports = {
    hash: async (req, res) => {
        try {
            serviceJimp.hashService(sourceDirectory, destinationDirectory)
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

    hashRecadrage125: async (req, res) => {
        try {
            serviceJimp.hashRecadrageService125(sourceDirectory, destinationDirectory)
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

    hashRecadrage1Virgule25: async (req, res) => {
        try {
            serviceJimp.hashRecadrageService1Virgule25(sourceDirectory, destinationDirectory)
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

    pixel: async (req, res) => {
        try {
            serviceJimp.pixelService(sourceDirectory, destinationDirectory)
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

    pixelRecadrage1Virgule25: async (req, res) => {
        try {
            serviceJimp.pixelService1Virgule25(sourceDirectory, destinationDirectory)
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