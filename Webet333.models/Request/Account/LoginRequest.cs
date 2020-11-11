using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using Webet333.models.Enums;

namespace Webet333.models.Request.Account
{
    public class LoginRequest
    {
        //[EmailAddress(ErrorMessage = "Please provide a valid Email.")]
        public string UserName { get; set; }

        [StringLength(128, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Required]
        public string Password { get; set; }

        [Required]
        public GrantTypeEnums GrantType { get; set; }
    }
}