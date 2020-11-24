const adminBD = require("../config/firebase_admin");
const db = adminBD.firestore();
const FieldValue = adminBD.firestore.FieldValue;
let batch = db.batch();
var settings = { timestampsInSnapshots: true };
db.settings(settings);
class GeneralCrud {
  constructor(collection) {
    this.collection = collection;
  }

  _createBatch(data) {
    console.log('create')
    var newRef = db.collection(this.collection).doc();
    batch.create(newRef, data);
  }

  _setBatch(data) {
    console.log('set')
    var newRef = db.collection(this.collection).doc();
    batch.set(newRef, data);
  }

  _updateBatch(documentRef, data) {
    console.log('update')
    batch.update(documentRef, data);
  }

  _deleteBatch(documentRef) {
    console.log('delete')
    batch.delete(documentRef);
  }

  async _commitBatch() {
    console.log('commit')
    var response = {};
    await batch
      .commit()
      .then(function () {
        response = { success: true, message:'Lote almacenado con exito'};
        console.log("Done.");
      })
      .catch(function (err) {
        response = { success: false, message: 'Ha ocurrido un error al almacenar el lote',error:err};
        console.log(`There was an error: ${err}`);
      });
      batch = db.batch();
      return response
  }

  async _create(data) {
    data.created = FieldValue.serverTimestamp();
    var response = {};
    await db
      .collection(this.collection)
      .add(data)
      .then((ref) => {
        console.log("Added doc with ID: ", ref.id);
        response = { success: true, message: ref.id };
      })
      .catch((error) => {
        console.error("Error updating doc", error);
        response = { success: false, message: error };
      });
    return response;
  }

  async _deleteById(id) {
    const document = db.collection(this.collection).doc(id);
    var response = {};
    await document
      .delete()
      .then(() => {
        console.log("Document deleted");
        response = { success: true, message: id };
      })
      .catch((error) => {
        console.error("Error updating doc", error);
        response = { success: false, message: error };
      });
    return response;
  }

  async _updateById(id, data) {
    const document = db.collection(this.collection).doc(id);
    var response = {};
    data.update = FieldValue.serverTimestamp();
    await document
      .update(data)
      .then(() => {
        console.log("Document updated");
        response = { success: true, message: id };
      })
      .catch((error) => {
        console.error("Error updating doc", error);
        response = { success: false, message: error };
      });
    return response;
  }

  async _getRowsByParam(key, value, condition) {
    let collection = db.collection(this.collection);
    var response = {};
    //user = (await userService.customClaim()).claims
    await collection
      .where(key, condition, value)
      .get()
      .then((snapshot) => {
        response = { success: true, data: snapshot };
      })
      .catch((error) => {
        console.error("Error updating doc", error);
        response = { success: false, data: error };
      });
    return response;
  }

  async _findByThreeCondition(param) {
    let collection = db.collection(this.collection);
    var response = {};
    await collection
      .where(param.keyOne, param.conditionOne, param.valueOne)
      .where(param.keyTwo, param.conditionTwo, param.valueTwo)
      .where(param.keyThree, param.conditionThree, param.valueThree)
      .get()
      .then((snapshot) => {
        if (snapshot.size==0) {
          console.log("No such document!");
          response = {
            success: false,
            data: "No se encontro ningun documento",
          };
        } else {
          response = { success: true, data: snapshot };
        }
      })
      .catch((error) => {
        console.error("Error updating doc", error);
        response = { success: false, data: error };
      });
    return response;
  }

  async _findByTwoCondition(param) {
    let collection = db.collection(this.collection);
    var response = {};
    await collection
      .where(param.keyOne, param.conditionOne, param.valueOne)
      .where(param.keyTwo, param.conditionTwo, param.valueTwo)
      .get()
      .then((snapshot) => {
        if (snapshot.size==0) {
          console.log("No such document!");
          response = {
            success: false,
            data: "No se encontro ningun documento",
          };
        } else {
          response = { success: true, data: snapshot };
        }
      })
      .catch((error) => {
        console.error("Error updating doc", error);
        response = { success: false, data: error };
      });
    return response;
  }

  async _getById(id) {
    let getDoc = db.collection(this.collection).doc(id);
    var response = {};
    await getDoc
      .get()
      .then((snapshot) => {
        if (!snapshot.exists) {
          console.log("No such document!");
          response = {
            success: false,
            data: "No se encontro ningun documento",
          };
        } else {
          response = { success: true, data: snapshot };
        }
      })
      .catch((error) => {
        response = { success: false, data: error };
      });
    return response;
  }

  async _getAll() {
    let collectionRef = db.collection(this.collection);
    var response = {};
    await collectionRef
      .get()
      .then((snapshot) => {
        if (snapshot.size==0) {
          console.log("No such document!");
          response = {
            success: false,
            data: "No se encontro ningun documento",
          };
        } else {
          response = { success: true, data: snapshot };
        }
      })
      .catch((error) => {
        response = { success: false, data: error };
      });
    return response;
  }

  async _createBatched(data) {
    var batch = db.batch();
    const collection = db.collection(this.collection);
    data.forEach((doc) => {
      var newRef = db.collection(this.collection).doc();
      batch.create(newRef, data[key]);
    });
  }

  async _resetCollection(newData) {
    await db.collection(this.collection)
      .listDocuments()
      .then((val) => {
        var lengthNewData = newData.length;
        console.log(lengthNewData)
        var ctrl = 0;
        if (val.length > 0) {
          for (const key in val) {
            ctrl = key;
            console.log(key);
            if (key < lengthNewData) {
              this._updateBatch(val[key], newData[key])
              console.log("actualizado " + key);
            } else {
              this._deleteBatch(val[key])
              console.log("eliminado");
            }
          }
          if (lengthNewData > ctrl) {
            console.log('El resto')
            var a = Number(ctrl) + 1;
            var b = lengthNewData;
            console.log(a)
            console.log(b)
            for (let index = a; index < b; index++) {
              console.log("Creado " + index);
              this._setBatch(newData[index])
            }
          }
        } else {
          for (const key in newData) {
            this._setBatch(newData[key])
          }
        }
        
      });
      return await this._commitBatch()
  }

  async _updateArray(id, data) {
    const document = db.collection(this.collection).doc(id);
    var response = {};
    await document
      .update({
        value: FieldValue.arrayUnion(data),
      })
      .then(() => {
        console.log("Document updated");
        response = { success: true, message: id };
      })
      .catch((error) => {
        console.error("Error updating doc", error);
        response = { success: false, message: error };
      });
    return response;
  }
}
module.exports = GeneralCrud;
