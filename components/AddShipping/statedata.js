import { fCurrency } from "../../utils/formatNumber";

const stateList = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export const getOptions = (list) =>
  list.map((state) => ({
    value: state,
    label: state,
  }));
export const stateOptions = getOptions(stateList);
const shippingList = {
  Abia: 2000,
  Adamawa: 2000,
  "Akwa Ibom": 2500,
  Anambra: [{ Ekwulobia: 2000 }, { Nnewi: 2000 }],
  Bauchi: 3000,
  Bayelsa: 2500,
  Benue: 3000,
  Borno: 3000,
  "Cross River": 2500,
  Delta: [{ Warri: 2500 }, { Agbor: 2500 }],
  Ebonyi: 2000,
  Edo: [{ Auchi: 2500 }, { Ekpoma: 2500 }],
  Ekiti: 2500,
  Enugu: 2000,
  "FCT - Abuja": 3000,
  Gombe: 3000,
  Imo: 2000,
  Jigawa: 3000,
  Kaduna: 3000,
  Kano: 3000,
  Katsina: 3000,
  Kebbi: 3000,
  Kogi: 3000,
  Kwara: 2000,
  Lagos: [
    { "MARINA/CMS": 2000 },
    { "V.I": 2000 },
    { IKOYI: 2000 },
    { "LEKKI PHASE 1": 2000 },
    { AJAH: 2500 },
    { SANGOTEDO: 2500 },
    { "AWOYAYA/IBEJU LEKKI": 3500 },
    { APAPA: 2000 },
    { MILE2: 1000 },
    { CELE: 1000 },
    { FESTAC: 1000 },
    { "AMUWO ODOFIN": 1000 },
    { AGO: 1000 },
    { OSHODI: 2800 },
    { SURULERE: 1500 },
    { ANTHONY: 2600 },
    { GBAGADA: 2000 },
    { IKEJA: 2000 },
    { OGBA: 2500 },
    { "AJEO ESTATE": 2500 },

    // OGBA
    // 2,000
    // AJEO ESTATE
    // 1,500
    // AIRPORT ROAD
    // 1,500
    // ASWANI
    // 1,500
    // IKOTU
    // 2,600
    // IGANDO
    // 2,000
    // ISOLO
    // 1,500
    // OJODU BERGER
    // 2,500
    // IKORODU B4 GARAGE
    // 2,500
    // IKORODU AFTER GARAG
    // 3,000
    // TRADEFAIR
    // 2000
    // ALABA
    // 2,000
    // ORILE/COKER
    // 1,500
    // KETU ALAPERE/MILE12
    // 2,500
    // OGUDU GRA
    // 2,000
    // MAGODO PHASE 1
    // 2,500
    // MAGODO PPHASE 2
    // 2,000
    // EGBEDA
    // 2,000
    // OKOKO
    // 2,500
    // VESPER/AGBARA
    // 4,000
    // IYANOBA
    // 2,000
    // SHERI Ohun
    // 2,000
    // BARIGA
    // 2,000
  ],
  Nasarawa: 3000,
  Niger: 3000,
  Ogun: 2000,
  Ondo: 2000,
  Osun: 2000,
  Oyo: 2000,
  Plateau: 3000,
  Rivers: 2500,
  Sokoto: 3000,
  Taraba: 3000,
  Yobe: 3000,
  Zamfara: 3000,
};

export const getLocationsByState = (state) => {
  if (shippingList[state]) {
    if (shippingList[state]?.length) {
      return shippingList[state];
    } else {
      return [{ [state]: shippingList[state] }];
    }
  } else {
    return [];
  }
};

export const convertLocationsToOptions = (locationArray) =>
  locationArray.map((location) => ({
    label: `${Object.keys(location)[0]}, (${fCurrency(
      location[Object.keys(location)[0]]
    )})`,
    value: location[Object.keys(location)[0]],
  }));
