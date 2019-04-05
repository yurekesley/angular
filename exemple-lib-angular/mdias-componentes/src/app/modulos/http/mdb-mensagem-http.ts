export class MdbMensagemHttp {
    public titulo = '';
    public sucesso = '';
    public falha = '';

    constructor(parametros: Partial<MdbMensagemHttp> = null) {
      if (parametros) {
        Object.assign(this, parametros);
      }
    }
  }
