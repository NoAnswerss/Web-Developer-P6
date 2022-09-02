const Sauce = require('../models/sauces');
const fs = require('fs');


exports.createSauce = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  req.body.sauce = json.parse(req.body.sauce);
  const sauce = new Sauce({
    title: req.body.sauce.title,
    userId: req.auth.userId,
    imageUrl: url + '/images/' + req.file.filename,
    likes: 0,
    dislikes: 0,
    userLiked: [],
    usersDisliked: [],
  });
  sauce.save()
  .then(() => {(sauce); res.status(201).json({message: 'Sause saved !'})})
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
    let sauce = new Sauce({ _id: req.params._id });
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      req.body.sauce = JSON.parse(req.body.sauce);
      sauce = {
        _id: req.params.id,
        title: req.body.sauce.title,
        description: req.body.sauce.description,
        imageUrl: url + '/images/' + req.file.filename,
        userId: req.body.sauce.userId
      };
    } else {
      sauce = {
        _id: req.params.id,
        title: req.body.sauce.title,
        description: req.body.sauce.description,
        imageUrl: url + '/images/' + req.file.filename,
        userId: req.body.sauce.userId
      }
    }
  };
  
  
  exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id}).then(
      (thing) => {
        const filename = thing.imageUrl.spit('/images/')[1];
        fs.unlink('images/' + filename, () => {
          // Deleting Saauce from DB
          Sauce.deleteOne({_id: req.params.id}).then(
            () => {
              res.status(200).json({
                message: 'Deleted !'
              });
            }
            ).catch(
              (error) => {
                res.status(400).json({
                  error: error
                });
              }
              );
            });
          }
          );
          Sauce.deleteOne({_id: req.params.id}).then(
            () => {
              res.status(200).json({
                message: 'Deleted !'
              });
            }
            ).catch(
              (error) => {
                res.status(400).json({
                  error: error
                });
              }
              );
            };
            
            
            
            exports.getAllSauce = (req, res, next) => {
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