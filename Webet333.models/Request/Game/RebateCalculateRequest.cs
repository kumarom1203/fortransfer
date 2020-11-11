﻿using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Webet333.models.Request.Game
{
    public class RebateCalculateRequest
    {
        [Required]
        [JsonProperty(PropertyName ="fromdate")]
        public string FromDate { get; set; }

        [Required]
        [JsonProperty(PropertyName = "todate")]
        public string ToDate { get; set; }

        [Required]
        [JsonProperty(PropertyName = "rebate")]
        public decimal Rebate { get; set; }

        [Required]
        [JsonProperty(PropertyName = "gametype")]
        public string GameType { get; set; }

    }
}
