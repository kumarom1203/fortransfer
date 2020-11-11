using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Request.Account
{
    public class IcNumberAddRequest
    {
        [JsonProperty(PropertyName ="icNumber")]
        public string ICNumber { get; set; }

        [JsonProperty(PropertyName = "userId")]
        public string UserId { get; set; }
    }

    public class IcImageAddRequest
    {
        [JsonProperty(PropertyName = "file")]
        public string File { get; set; }

        [JsonProperty(PropertyName = "userId")]
        public string UserId { get; set; }
    }
}
