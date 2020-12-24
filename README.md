install node
install npm 

export
======

export SMTP_PASSWORD=*******
export NLP_API_KEY=*********

run: 	npm install 
run: 	node app.js 


run as PM2 app: 
pm2 start ecosystem.config.js