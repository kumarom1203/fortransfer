﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Webet333.models.Response.Game.SexyBaccarat
{
    public class SexybaccaratWithdrawResponse
    {
        public decimal amount { get; set; }
        public string method { get; set; }
        public decimal currentBalance { get; set; }
        public Decimal databaseId { get; set; }
        public string txCode { get; set; }
        public string status { get; set; }
        public string desc { get; set; }
    }
}
