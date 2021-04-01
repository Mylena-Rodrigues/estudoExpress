const { response } = require('express');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());
const projects = [];

/**
 *  Query Params: Vamos usar principalmente para filtros e paginação
 *  Route Params: Identificar recursos na hora de atualizar ou deletar
 *  Request Body: Informações que chegam através da requisição do usuario
 *  
 */

app.get('/projects', (req, res) => {
    return res.json(projects);
});


app.post('/projects', (req, res) => {
    const { title, owner } = req.body;

    const project = { id: uuidv4(), title, owner };

    projects.push(project);
    return res.json(project);
});



app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex( project => project.id === id);
    
    if(projectIndex < 0){
        return response.status(400).json({error: 'Projeto não foi encontrado'});
    }
    const project = {
        id,
        title,
        owner,
    }

    projects[projectIndex] = project;

    return response.json(project);
})

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;
    
    const projectIndex = projects.findIndex( project => project.id === id);
    
    if(projectIndex < 0){
        return response.status(400).json({error: 'Projeto não foi encontrado'});
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
// send igual a um json vazio, não teria diferença
})

app.listen(3333);