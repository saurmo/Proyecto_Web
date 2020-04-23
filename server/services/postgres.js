const { Pool } = require("pg");

class ServicePG {
  constructor() {
    this.pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "proyecto_aula",
      password: "7034",
      port: 5432
    });
  }

  async runSql(sql) {
    let answer = await this.pool.query(sql);
    return answer;
  }
}

module.exports = ServicePG;
