module.exports = function userdata({ mysql, pool }) {
    return Object.freeze({
        createDetailsInDataBase,
        getDetailsFromDataBase,
        upateDetailsInDataBase,
        deleteDetailsInDataBase,
        getLastDetailsFromDataBase,
        updateIfTaskCompletedInDataBase,
        deleteAllDetailsFromDataBase,
    });

    async function createDetailsInDataBase({ name, description, isCompleted, createdAt}) {
        if(!isCompleted){
            isCompleted = false;
        }
        const result = await mysql.execute(`
        INSERT INTO detailsManagement ( name, description, isCompleted, createdAt) VALUES (?, ?, ?, ?)`,
            [name, description, isCompleted , createdAt]
        );
        return result;
    }

    async function getDetailsFromDataBase({ }) {
        const result = await mysql.execute(`SELECT * FROM detailsManagement`);
        return result[0];
    }

    async function upateDetailsInDataBase({ id, name, description }) {
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
        queryString += `updatedAt = ? WHERE id = ? `
        valuesArray.push(new Date(), id)
        const result = await mysql.execute(queryString, valuesArray);
        return result;
    }

    async function updateIfTaskCompletedInDataBase({id, status}){
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
}