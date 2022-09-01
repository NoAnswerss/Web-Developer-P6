const Sauce = require('../models/sauces');
const fs = require('fs');


exports.createSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
      ...sauceObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0,
      userLiked: [],
      usersDisliked: [],
  });
    sauce.save()
      .then(() => {(sauce); res.status(201).json({message: 'sauce enregistré !'})})
      .catch(error => { res.status(400).json( { error })}) 
};


exports.getOneSauce = (req, res) => {
  Sauce.findOne({
    _id: req.params.id
  }).then((sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};


exports.modifySauce = (req, res, next) => {
    if(req.file) { // Si l'image est modifiée, on supprime l'ancienne image dans /image
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    const sauceObject = 
                    {   
                        ...JSON.parse(req.body.sauce),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Sauce modifiée avec succès !' }))
                        .catch(error => res.status(400).json({ error }))
                });
            });
    } else { // Si l'image n'est pas modifée
        const sauceObject = { ...req.body } 
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modifiée avec succès !' }))
            .catch(error => res.status(400).json({ error }))
    }
};


exports.deleteSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id})
      .then(sauces => {
          if (sauces.userId != req.auth.userId) {
              res.status(401).json({message: 'Not authorized'});
          } else {
              const filename = sauces.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  sauces.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Sauce supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};


exports.getAllSauce = (req, res) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.likeSauce = (req,res) => {
  Sauce.findOne({_id: req.params.id})
    .then(sauce => {
      const typeLikes = req.body.likes
      const user = req.body.userId
      switch (typeLikes) {
        case 1: 
            if(!sauce.usersLiked.find(us => us == user)) {
              sauce.likes++
              sauce.usersLiked.push(user)
            }
            console.log("likes");
            break
        case -1: 
            if (!sauce.usersDisliked.find(us => us == user)) {
              sauce.dislikes++
              sauce.usersDisliked.push(user)
            }
            console.log("dislikes");
            break
        case 0:
            let index = sauce.usersLiked.findIndex(us => us == user)
            if (index != -1) {
                console.log(index)
                sauce.usersLiked.splice(index, 1)
                sauce.likes--
                }
                else {
                index = sauce.usersDisliked.findIndex(us => us == user)
                console.log(index)
                sauce.usersDisliked.splice(index, 1)
                sauce.dislikes--
            }
            break
        default:
          console.log("problem")
          break
      }
      sauce.save()
                .then(() => {res.status(200).json({ message: "ok" }); console.log(res);})
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => {
          console.log(error)
          res.status(400).json({ error })
    })
}