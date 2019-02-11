const express =     require('express');
const db =          require('./database');


class Shoplist{

    static getAll(){
        return function( req,res, next){
            db.execute('SELECT items.id, items.name, items.quantity, shops.shop_name FROM items JOIN shops ON items.shop_name=shops.shopID;')
            .then(result => {
                res.send(result[0]);
            })
            .catch(err =>{
                console.log(err)
            });
        }
    }

    static removeItem(){
        return function( req,res, next){
            if(req.body){
                db.execute('DELETE FROM `shoplist`.`items` WHERE  `id`=?;',[req.body.id])
                .then(result => {
                    res.send(result)
                })
                .catch(err =>{
                    console.log(err)
                });
            }
        }
    }

    static updateItem(){
        return function( req,res, next){
            if(req.body){
                db.execute('UPDATE `shoplist`.`items` SET `name`=?, `quantity`=?, `shop_name`=? WHERE  `id`=?;',[req.body.item, req.body.quantity, req.body.shop, req.body.id])
                .then(result => {
                    res.send(result)
                })
                .catch(err =>{
                    console.log(err)
                });
                  
            }
        }
    }

    static addItem(){
        return function( req,res, next){
            if(req.body){
                db.execute('INSERT INTO items (`name`, `quantity`, `shop_name`) VALUES (?, ?, ?);',[req.body.item, req.body.quantity, req.body.shop])
                .then(result => {
                    res.send(result)
                })
                .catch(err =>{
                    console.log(err)
                });     
            }
        }
    }
}

module.exports = Shoplist;