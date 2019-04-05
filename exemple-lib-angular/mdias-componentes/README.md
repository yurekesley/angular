# Projeto Angular M Dias

Criação dos projetos em Angular da M Dias Branco 

Pré requisitos: 

1.    Node 8 ou superior
2.    Npm 6 ou superior
3.    Angular 7

# Criação do projeto Angular
```javascript 
ng new [nome do projeto] --routing --style=scss
```

# Instalação das Dependências
```javascript 
npm i mdias-componentes
```
```javascript 
npm i --save-dev  gulp@3.9.1 gulp-concat@2.6.1 gulp-string-replace@1.1.2 gulp-zip@4.2.0 del@3.0.0
```

#    Configuração dos ambientes do projeto.

### Environments
Uma vez criado o projeto, altere o conteúdo dos arquivos environments\environment.ts e environments\environment.prod.ts

####    environments\environment.ts
```javascript
export const environment = {
  production: false,
  APP_ID: 'PROJETO',
  ROTA_INICIO: 'inicio',
  URL_SERVIDOR: 'http://localhost:8080/[projeto-rest]'
};
```
####    environments\environment.prod.ts

```javascript

import { I18N } from 'mdias-componentes';

export const environment = {
  production: true,
  APP_ID: 'PROJETO',
  ROTA_INICIO: 'inicio',
  URL_SERVIDOR: '/[projeto-rest]', 
  I18N: I18N.ptBR

};
```

# Configuração do  app.module.ts
No arquivo app.module.ts, realize a importação do environment de desenvolvimento, na hora do build, o webpack fará a subistituição para o ambiente de produção.
```javascript
import { environment as env} from 'src/environments/environment';
```
Realize também a importação do módulo pricipal do mdias-componentes 
```javascript
import { MdbModulo } from 'mdias-componentes';
```
Nos imports do app.module.ts, informe ao MdbModulo quais as configurações da aplicação. 
```javascript
  imports: [
    BrowserModule,
    MdbModulo.forRoot(env),
    AppRoutingModule
  ],
```

# Configuração do  app-routing.module.ts

Na importação do módulo principal de rotas, configure a aplicação para usar "#" na url.

```javascript
  @NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
  ```

#   Configuração do app.component.html

Apague o conteúdo do arquivo app.component.html e adicione o seguinte conteúdo:

```html
<mdias-app anoReferencia="2019">
  <router-outlet></router-outlet>
</mdias-app>
```

#   Configuração do style.scss
Faça a importação do tema padrão do mdias-componentes

```css
@import "../node_modules/mdias-componentes/src/assets/tema/padrao";
```
#   Criação da pasta img

1.  Crie a pasta img dentro de assets
2.  Baixe a imagem logo-footer.png e coloque dentro da pasta img

        \\mdbnasff214\mdbcit$\Sistemas\MDIAS-COMPONENTES\logo-footer.png

#   Criação da pasta fonts

1.  Crie a pasta fonts de assets
2.  Realize o download das fontes no repositório de fontes do google e cole dentro da pasta fonts.

        FjallaOne-Regular.ttf
        material-icon.woff2
        Roboto-Regular.ttf


### Gulp
Criar o arquivo gulpfile.js com o seguinte conteúdo e alterar o valor da constante [nomeProjetoFront]
```javascript
const nomeProjetoFront = "[NOME DO PROJETO]";
const tipoArquivo = ".war";
const nomeDoZip = nomeProjetoFront+tipoArquivo;

const gulp = require('gulp');
const concat = require('gulp-concat');
const zip = require('gulp-zip');
const del = require('del');
const replace = require('gulp-string-replace');

gulp.task('war', function() {
  gulp.src(["./dist/index.html","./dist/**"])
  .pipe(zip(nomeDoZip))
  .pipe(gulp.dest("./build"));
});

gulp.task('index', function() {
  gulp.src(['./dist/index.html'])
    .pipe(replace(new RegExp('<base href="/">', 'g'), '<base href="/'+ nomeProjetoFront +'/">'))
    .pipe(concat('index.html'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function() {
  del.sync(['./dist/**']);
});
```
#    Configuração do angular.json

No angular.josn, procure pelas configurações de build de produção e atualize as [optimization e buildOptimizer ] propriedades conforme o exemplo:

```json
"configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "optimization": false,
              "outputHashing": "all",
              "sourceMap": false,
              "extractCss": true,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": false,
```

Configure a chave  "outputPath" para "dist"

```json
    "outputPath": "dist",
```


# Configuração dos cripts no package.json

Altere o valor da chave [scripts] no arquivo package.json com as tasks abaixo. 

```javascript
"scripts": {
    "ng": "ng",
    "start": "ng serve --open",
    "build": "ng build --prod && gulp index && gulp war && gulp clean",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  }
  ```
