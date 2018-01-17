'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

console.log(truckers);
console.log(deliveries);
console.log(actors);

deliveries.forEach(deliverie => {
  truckers.forEach(trucker => {
    if(deliverie.truckerId === trucker.id)
    {
      // Calculate the final price
      //deliverie.price = trucker.pricePerKm * deliverie.distance + deliverie.volume * trucker.pricePerVolume;

      // Calculate the final price with the "Decreasing pricing for high volumes" option
      if(deliverie.volume >= 25)
      {
        // 50% reduction if volume >= 25m3
        deliverie.price = trucker.pricePerKm * deliverie.distance + parseFloat((deliverie.volume * trucker.pricePerVolume * 0.5).toFixed(2));
      }
      else if(deliverie.volume >= 10)
      {
        // 30%
        deliverie.price = trucker.pricePerKm * deliverie.distance + parseFloat((deliverie.volume * trucker.pricePerVolume * 0.7).toFixed(2));
      }
      else if(deliverie.volume >= 5)
      {
        deliverie.price = trucker.pricePerKm * deliverie.distance + parseFloat((deliverie.volume * trucker.pricePerVolume * 0.9).toFixed(2));
      }
      else
      {
        deliverie.price = trucker.pricePerKm * deliverie.distance + parseFloat((deliverie.volume * trucker.pricePerVolume).toFixed(2));
      }
    }
  });

  var commission = parseFloat(deliverie.price * 0.3).toFixed(2);
  deliverie.commission.insurance = parseFloat((commission * 0.5).toFixed(2));
  deliverie.commission.treasury = parseInt(deliverie.distance / 500);
  deliverie.commission.convargo = parseFloat(commission * 0.5).toFixed(2) - deliverie.commission.treasury;

  var optionPrice = 0;

  // The deductible
  if(deliverie.options.deductibleReduction == true)
  {
    deliverie.price += deliverie.volume;
    optionPrice = deliverie.volume;
  }

  // Paiements for actors 
  actors.forEach(actor => {
    if(actor.deliveryId == deliverie.id)
    {
      actor.forEach(paiement => {
        if (paiement.who == "shipper") {
          paiement.amount = deliverie.price;
        }
        else if(paiement.who == "owner")
        {
          paiement.amount = deliverie.price - parseFloat(deliverie.price * 0.3).toFixed(2);
        }
        else if(paiement.who == "insurance")
        {
          paiement.amount = deliverie.commission.insurance;
        }
        else if(paiement.who == "treasury")
        {
          paiement.amount = deliverie.commission.treasury;
        }
        else if(paiement.who == "convargo")
        {
          paiement.amount= deliverie.commission.convargo + optionPrice;
        }
      });
    }
  });
});

console.log(deliveries);
