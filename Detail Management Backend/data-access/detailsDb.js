module.exports = function userdata({ mysql, pool }) {
    return Object.freeze({
        createDetailsInDataBase,
        getDetailsFromDataBase,
        upateDetailsInDataBase,
        deleteDetailsInDataBase,
        getLastDetailsFromDataBase,
        updateIfTaskCompletedInDataBase,
        deleteAllDetailsFromDataBase,
        updateJobDetails,
        createBulkDetailsInDataBase
    });

    async function createBulkDetailsInDataBase({ createObj }) {
        // if (!isCompleted) {
        //     isCompleted = false;
        // }
        const result = await mysql.execute(`
        INSERT INTO detailsManagement ( name, description, isCompleted, createdAt, duration, endedAt, inProcess, pickedBy, startedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [createObj.name, createObj.description, createObj.isCompleted, createObj.createdAt, createObj.duration, createObj.endedAt, createObj.inProcess, createObj.pickedBy, createObj.startedAt]
        );
        return result;
    }

    async function createDetailsInDataBase({ name, createdBy ,description, cutting, creasing, plywood, createdAt, isCompleted }) {
        if (!isCompleted) {
            isCompleted = false;
        }
        const result = await mysql.execute(`INSERT INTO detailsManagement ( name, createdBy ,description, cutting, creasing, plywood, createdAt, isCompleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,[name, createdBy, description, cutting, creasing, plywood, createdAt, isCompleted])
        return result;
    }

    async function getDetailsFromDataBase({ }) {
        const result = await mysql.execute(`SELECT * FROM detailsManagement`);
        return result[0];
    }

    async function upateDetailsInDataBase({ id, name, description, cutting, creasing, plywood }) {
        let queryString = `UPDATE detailsManagement SET `
        let valuesArray = [];
        if (name) {
            queryString += `name = ?,`;
            valuesArray.push(name);
        }
        if (description) {
            queryString += `description = ?,`
            valuesArray.push(description);
        }
        if (cutting) {
            queryString += `cutting = ?,`
            valuesArray.push(cutting);
        }
        if (creasing) {
            queryString += `creasing = ?,`
            valuesArray.push(creasing);
        }
        if (plywood) {
            queryString += `plywood = ?,`
            valuesArray.push(plywood);
        }
        queryString += `updatedAt = ? WHERE id = ? `
        valuesArray.push(new Date(), id)
        const result = await mysql.execute(queryString, valuesArray);
        return result;
    }

    async function updateIfTaskCompletedInDataBase({ id, status }) {
        const result = await mysql.execute(`UPDATE detailsManagement SET isCompleted = ? WHERE id = ?`, [status, id])
        return result;
    }

    async function deleteDetailsInDataBase({ id }) {
        const result = await mysql.execute(`DELETE FROM detailsManagement WHERE id = ?`, [id]);
        return result;
    }

    async function getLastDetailsFromDataBase({ }) {
        const result = await mysql.execute(`SELECT * FROM detailsManagement ORDER BY id DESC LIMIT 1`);
        return result[0][0];
    }

    async function deleteAllDetailsFromDataBase({ }) {
        const result = await mysql.execute(`DELETE FROM detailsManagement`)
        return result
    }

    async function updateJobDetails({designBy, designStartedAt, designEndedAt, laserBy, laserStartedAt, laserEndedAt, benderBy, benderStartedAt, benderEndedAt, fittingBy, fittingStartedAt, fittingEndedAt, creasingBy, creasingStartedAt, creasingEndedAt, deliveryBy, deliveryStartedAt, deliveryEndedAt ,pickedBy ,startedAt, endedAt, duration, id, inProcess }) {
        let queryString = `UPDATE detailsManagement SET `
        let valuesArray = [];
        if(deliveryBy) {
            queryString += 'deliveryBy=?,',
            valuesArray.push(deliveryBy);
        }
        if(deliveryStartedAt) {
            queryString += 'deliveryStartedAt=?,',
            valuesArray.push(deliveryStartedAt);
        }
        if(deliveryEndedAt) {
            queryString += 'deliveryEndedAt=?,',
            valuesArray.push(deliveryEndedAt);
        }
        if(creasingBy) {
            queryString += 'creasingBy=?,',
            valuesArray.push(creasingBy);
        }
        if(creasingStartedAt) {
            queryString += 'creasingStartedAt=?,',
            valuesArray.push(creasingStartedAt);
        }
        if(creasingEndedAt) {
            queryString += 'creasingEndedAt=?,',
            valuesArray.push(creasingEndedAt);
        }
        if(fittingBy) {
            queryString += 'fittingBy=?,',
            valuesArray.push(fittingBy);
        }
        if(fittingStartedAt) {
            queryString += 'fittingStartedAt=?,',
            valuesArray.push(fittingStartedAt);
        }
        if(fittingEndedAt) {
            queryString += 'fittingEndedAt=?,',
            valuesArray.push(fittingEndedAt);
        }
        if(benderBy) {
            queryString += 'benderBy=?,',
            valuesArray.push(benderBy);
        }
        if(benderStartedAt) {
            queryString += 'benderStartedAt=?,',
            valuesArray.push(benderStartedAt);
        }
        if(benderEndedAt) {
            queryString += 'benderEndedAt=?,',
            valuesArray.push(benderEndedAt);
        }
        if(laserBy) {
            queryString += 'laserBy=?,',
            valuesArray.push(laserBy);
        }
        if(laserStartedAt) {
            queryString += 'laserStartedAt=?,',
            valuesArray.push(laserStartedAt);
        }
        if(laserEndedAt) {
            queryString += 'laserEndedAt=?,',
            valuesArray.push(laserEndedAt);
        }
        if(designBy) {
            queryString += 'designBy=?,',
            valuesArray.push(designBy);
        }
        if(designStartedAt) {
            queryString += 'designStartedAt=?,',
            valuesArray.push(designStartedAt);
        }
        if(designEndedAt) {
            queryString += 'designEndedAt=?,',
            valuesArray.push(designEndedAt);
        }
        if (inProcess) {
            queryString += `inProcess = ?, `
            valuesArray.push(inProcess);
        }
        if (pickedBy) {
            queryString += `pickedBy = ?, `;
            valuesArray.push(pickedBy);
        }
        if (startedAt) {
            queryString += `startedAt = ?,`;
            valuesArray.push(startedAt);
        }
        if (endedAt) {
            queryString += `endedAt = ?,`
            valuesArray.push(endedAt);
        }
        if (duration) {
            queryString += `duration = ?,`;
            valuesArray.push(duration);
        }
        queryString += `updatedAt = ? WHERE id = ? `
        valuesArray.push(new Date(), id)
        return await mysql.execute(queryString, valuesArray);
    }
}