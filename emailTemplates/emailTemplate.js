const fs = require('fs');
const path = require('path');

const loadEmailTemplate = (templateFileName) => {
    const templatePath = path.join(__dirname, templateFileName);
    return fs.readFileSync(templatePath, 'utf-8');
};

module.exports = {
    loadEmailTemplate,
};
