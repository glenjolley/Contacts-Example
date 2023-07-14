using contax_api.DBContext;
using contax_api.Models;
using Dapper;
using Microsoft.AspNetCore.Mvc;

namespace contax_api.Controllers
{

    [ApiController]
    [Route("contacts")]
    public class ContactsController : Controller
    {
        private readonly IDBContext _db;

        public ContactsController(IDBContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetContacts()
        {
            return Ok(await _db.GetDataAsync<Contact,dynamic?>("GetContacts", null));
        }

        [HttpPost]
        public async Task<IActionResult> AddNewContact([FromBody] Contact contact)
        {
            DynamicParameters p = new();

            p.Add("@FirstName", contact.FirstName);
            p.Add("@LastName", contact.LastName);
            p.Add("@NewContactID", 0, System.Data.DbType.Int32, System.Data.ParameterDirection.Output);

            await _db.SendDataAsync("AddNewContact", p);

            contact.ID = p.Get<int>("@NewContactID");

            return Ok(contact);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteContact(int id)
        {
            await _db.SendDataAsync("DeleteContact", new { ID = id });

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateContact([FromBody] Contact contact)
        {
            await _db.SendDataAsync("UpdateContact", new { ID = contact.ID, FirstName = contact.FirstName, LastName = contact.LastName });

            return Ok();
        }
    }
}
