namespace contax_api.DBContext
{
    public interface IDBContext
    {
        Task<IEnumerable<T>> GetDataAsync<T, P>(string sp, P parameters);
        Task SendDataAsync<P>(string sp, P parameters);
    }
}