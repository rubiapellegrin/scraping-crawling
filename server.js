const { request, response } = require('express');
const express = require('express');
const puppeteer  = require('puppeteer');
const server = express();
server.get('/', async (request,response)=> {
            const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://moodle.passofundo.ifsul.edu.br/');

        const dados = await page.evaluate(()=>{   //pega os dados
            return{
                tittle: document.querySelector('.no-overflow span').innerHTML,
                curso: document.querySelector('.categoryname').innerHTML,
            };
        });
        response.send(dados.tittle);
        await browser.close();

});

server.listen(3000, () => {
    console.log('servidor subiu em localhost:3000');
});
