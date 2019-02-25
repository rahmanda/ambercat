const path = require('path');
const fs = require('fs');
const glob = require('glob');
const calculateReadingTime = require('reading-time');
const { require: reqRoot } = require('app-root-path');
const parseText = require('gray-matter');
const compileMarkdown = reqRoot('lib/markdown-compiler');
const config = reqRoot('config');
const { readFile } = reqRoot('lib/helpers/file');

function main(filepath) {
  return parser(readFile(filepath), filepath);
}

function parser(text, filepath) {
  const { data, content } = parseText(text);
  const {
    date,
    path,
    language,
    direction,
    translations,
    originalPostPath,
  } = parseFilepath(filepath);
  return {
    url: path,
    data: {
      title: data.title,
      summary: data.summary,
      readingTime: calculateReadingTime(content),
      date,
      path,
      language,
      direction,
      translations,
      originalPostPath,
    },
    content: compileMarkdown(config.transformPost(content)),
  };
}

function parseFilepath(filepath) {
  const [, date, filename] = parseFilename(filepath);
  return Object.assign({}, getOutputPath(filepath, filename), { date });
}

function parseFilename(filepath) {
  const filenameRule = /(\d+-\d+-\d+)-(.+)\.md$/;
  return filepath.match(filenameRule);
}

function getOutputPath(filepath, filename) {
  const parsedFilename = filename.split('/');
  const defaultLanguage = config.language;
  const defaultDirection = config.direction;
  if (parsedFilename.length === 1) {
    return {
      path: `/${parsedFilename[0]}.html`,
      language: defaultLanguage,
      direction: defaultDirection,
    };
  }
  const parsedLanguage = parsedFilename[1].split('.');
  if (parsedLanguage.length === 1) {
    return {
      path: `/${parsedFilename[0]}.html`,
      language: defaultLanguage,
      direction: defaultDirection,
      translations: getTranslations(filepath, parsedFilename[0]),
    };
  }
  return {
    path: `${parsedLanguage[1]}/${parsedFilename[0]}.html`,
    language: parsedLanguage[1],
    direction: config.translations[parsedLanguage[1]].direction,
    originalPostPath: `/${parsedFilename[0]}.html`,
  };
}

function getTranslations(filepath, basename) {
  const dir = path.dirname(filepath);
  const files = glob.sync(`${dir}/*`);
  const detector = /.+\.(.+)/;
  const translations = files.reduce((acc, file) => {
    const [, , filename] = parseFilename(file);
    const parsedFilename = filename.match(detector);
    if (parsedFilename && config.translations && config.translations[parsedFilename[1]]) {
      const locale = config.translations[parsedFilename[1]];
      acc.push({
        name: locale.name,
        code: parsedFilename[1],
        path: `/${parsedFilename[1]}/${basename}.html`,
      });
    }
    return acc;
  }, []);
  if (translations.length) return translations;
  return undefined;
}

module.exports = main;
