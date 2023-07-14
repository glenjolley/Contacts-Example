using Dapper;
using Microsoft.Data.SqlClient;

namespace contax_api.DBContext
{
    public class DBAccess : IDBContext
    {
        private readonly IConfiguration _config;
        private readonly string _connectionString;

        public DBAccess(IConfiguration config)
        {
            _config = config;
            _connectionString = _config.GetConnectionString("localDev");
        }

        public async Task<IEnumerable<T>> GetDataAsync<T, P>(string sp, P parameters)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                return await con.QueryAsync<T>(sp, parameters, commandType: System.Data.CommandType.StoredProcedure);
            }
        }

        public async Task SendDataAsync<P>(string sp, P parameters)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                await con.ExecuteAsync(sp, parameters, commandType: System.Data.CommandType.StoredProcedure);
                return;
            }
        }
    }
}
