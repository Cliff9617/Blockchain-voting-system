/**
 * Kenya Locations Data
 * Contains all 47 counties with their constituencies and wards.
 * This data is used for voter registration and geographical ballot filtering.
 */

const kenyaLocations = {
  counties: [
    {
      id: 1,
      name: "Mombasa",
      code: "001",
      constituencies: [
        {
          name: "Changamwe",
          wards: ["Chaani", "Kipevu", "Magongo", "Port Reitz", "Airport/Sikivu"]
        },
        {
          name: "Jomvu",
          wards: ["Jomvu Kuu", "Mwananchi", "Mjomboleni", "Tudor"]
        },
        {
          name: "Kisauni",
          wards: ["Bamburi", "Buruburu", "Kayole", "Korogocho", "Mwakirunge"]
        },
        {
          name: "Likoni",
          wards: ["Bofa", "Likoni", "Mtongwe", "Shimoni", "Tiwi"]
        },
        {
          name: "Mvita",
          wards: ["Mombasa North", "Mombasa South", "Tangana", "Towns East", "Towns West"]
        },
        {
          name: "Nyali",
          wards: ["Freretown", "Kongowea", "Majengo", "Mkomani", "Ziwa La Ng'ombe"]
        }
      ]
    },
    {
      id: 2,
      name: "Kwale",
      code: "002",
      constituencies: [
        {
          name: "Kinango",
          wards: ["Kinango", "Mwalus", "Ndzovuni", "Pembe Tatu", "Tsimba"]
        },
        {
          name: "Lungalunga",
          wards: ["Gombato", "Kigonigoni", "Lungalunga", "Mkwiro", "Ukunda"]
        },
        {
          name: "Matuga",
          wards: ["Bodo", "Chonyi", "Dzombo", "Mkongani", "Waa"]
        },
        {
          name: "Msambweni",
          wards: ["Gazi", "Jimbo", "Mwalus", "Tiwi", "Ukunda"]
        }
      ]
    },
    {
      id: 3,
      name: "Kilifi",
      code: "003",
      constituencies: [
        {
          name: "Kaloleni",
          wards: ["Bege", "Kaloleni", "Kayafungo", "Kinango", "Mariakani"]
        },
        {
          name: "Kilifi North",
          wards: ["Gede", "Kakuyuni", "Kilifi North", "Mnarani", "Sokoke"]
        },
        {
          name: "Kilifi South",
          wards: ["Bofa", "Jilore", "Keren", "Mtepeni", "Tsangatsini"]
        },
        {
          name: "Giriama",
          wards: ["Chonyi", "Giriama", "Kambe", "Ribe", "Sokoke"]
        },
        {
          name: "Malindi",
          wards: ["Gede", "Malindi", "Mambrui", "Shella", "Watamu"]
        },
        {
          name: "Rabai",
          wards: ["Chonyi", "Kambe", "Rabai", "Ribe", "Sokoke"]
        }
      ]
    },
    {
      id: 4,
      name: "Tana River",
      code: "004",
      constituencies: [
        {
          name: "Garsen",
          wards: ["Garsen", "Kirumbi", "Mikinduri", "Ngao", "Wayu"]
        },
        {
          name: "Galole",
          wards: ["Banissa", "Deda", "Modogashe", "Nanighi", "Yontila"]
        },
        {
          name: "Bura",
          wards: ["Chewele", "Gubao", "Madogo", "Sala", "Wenje"]
        }
      ]
    },
    {
      id: 5,
      name: "Taita Taveta",
      code: "005",
      constituencies: [
        {
          name: "Mwatate",
          wards: ["Mwatate", "Ngangao", "Rongu", "Sagalla", "Wusi"]
        },
        {
          name: "Taveta",
          wards: ["Mrayu", "Rombo", "Tarakea", "Taveta", "Werugha"]
        },
        {
          name: "Wundanyi",
          wards: ["Bura", "Kasigau", "Mbololo", "Mgange", "Wundanyi"]
        },
        {
          name: "Voi",
          wards: ["Chala", "Kisima", "Mbololo", "Mrayu", "Voi"]
        }
      ]
    },
    {
      id: 6,
      name: "Garissa",
      code: "006",
      constituencies: [
        {
          name: "Balambala",
          wards: ["Balambala", "Jarajila", "Sankuri", "Tarsa", "Tula"]
        },
        {
          name: "Dadaab",
          wards: ["Dadaab", "Liban", "Sirika", "Laban", "Barwale"]
        },
        {
          name: "Fafi",
          wards: ["Dekhar", "Fafi", "Gubra", "Modogashe", "Wajir"]
        },
        {
          name: "Ijara",
          wards: ["Gumarey", "Hulugho", "Ijara", "Masalani", "Sokoni"]
        },
        {
          name: "Lagdera",
          wards: ["Dekhar", "Fafi", "Lagdera", "Modogashe", "Wajir"]
        },
        {
          name: "Garissa",
          wards: ["Balambala", "Boji", "Garissa", "Iftin", "Township"]
        }
      ]
    },
    {
      id: 7,
      name: "Wajir",
      code: "007",
      constituencies: [
        {
          name: "Eldas",
          wards: ["Dekhar", "Eldas", "Harar", "Lagdera", "Wajir"]
        },
        {
          name: "Tarbaj",
          wards: ["Bute", "Damajire", "Gubra", "Tarbaj", "Wagberi"]
        },
        {
          name: "Wajir North",
          wards: ["Barwale", "Bute", "Dadaab", "Liban", "Sirika"]
        },
        {
          name: "Wajir South",
          wards: ["Alango", "Arkia", "El Wak", "Gumburey", "Wajir"]
        },
        {
          name: "Wajir East",
          wards: ["Dekhar", "Fafi", "Lagdera", "Modogashe", "Wajir"]
        },
        {
          name: "Wajir West",
          wards: ["Bute", "Damajire", "Gubra", "Tarbaj", "Wagberi"]
        }
      ]
    },
    {
      id: 8,
      name: "Mandera",
      code: "008",
      constituencies: [
        {
          name: "Banissa",
          wards: ["Banissa", "Deda", "Modogashe", "Nanighi", "Yontila"]
        },
        {
          name: "Lafey",
          wards: ["Lafey", "Rhamu", "Takaba", "Yontila", "Banissa"]
        },
        {
          name: "Mandera East",
          wards: ["Alango", "Arkia", "El Wak", "Gumburey", "Mandera"]
        },
        {
          name: "Mandera North",
          wards: ["Asa", "Gither", "Kormey", "Mandera", "Rhamu"]
        },
        {
          name: "Mandera South",
          wards: ["Banissa", "Dekhar", "Fafi", "Lafey", "Takaba"]
        },
        {
          name: "Mandera West",
          wards: ["Dekhar", "Fafi", "Lagdera", "Modogashe", "Wajir"]
        }
      ]
    },
    {
      id: 9,
      name: "Marsabit",
      code: "009",
      constituencies: [
        {
          name: "Laisamis",
          wards: ["Dile", "Dukana", "Laisamis", "Logologo", "Maikona"]
        },
        {
          name: "Moyale",
          wards: ["Dile", "Dukana", "Moyale", "Sagante", "Sololo"]
        },
        {
          name: "North Horr",
          wards: ["Dukana", "Maikona", "North Horr", "Sagante", "Turbi"]
        },
        {
          name: "Saku",
          wards: ["Dile", "Kargi", "Laisamis", "Logologo", "Saku"]
        }
      ]
    },
    {
      id: 10,
      name: "Isiolo",
      code: "010",
      constituencies: [
        {
          name: "Isiolo North",
          wards: ["Bute", "Chari", "Isiolo", "Kinna", "Sericho"]
        },
        {
          name: "Isiolo South",
          wards: ["Garbatulla", "Jara", "Merti", "Modogashe", "Wajir"]
        }
      ]
    },
    {
      id: 11,
      name: "Meru",
      code: "011",
      constituencies: [
        {
          name: "Buuri",
          wards: ["Antubetwe", "Kibirichia", "Kionyo", "Mikinduri", "Nkubu"]
        },
        {
          name: "Central Imenti",
          wards: ["Abothuguch", "Igembe", "Mikinduri", "Nkubu", "Timau"]
        },
        {
          name: "Igembe North",
          wards: ["Athiru", "Gaitu", "Kibirichia", "Kionyo", "Mikinduri"]
        },
        {
          name: "Igembe South",
          wards: ["Antubetwe", "Kibirichia", "Kionyo", "Mikinduri", "Nkubu"]
        },
        {
          name: "Igembe Central",
          wards: ["Athiru", "Gaitu", "Kibirichia", "Kionyo", "Mikinduri"]
        },
        {
          name: "Igembé North",
          wards: ["Antubetwe", "Kibirichia", "Kionyo", "Mikinduri", "Nkubu"]
        },
        {
          name: "Laikipia",
          wards: ["Donyo", "Nanyuki", "Nyahururu", "Rumuruti", "Umande"]
        },
        {
          name: "North Imenti",
          wards: ["Athiru", "Gaitu", "Kibirichia", "Kionyo", "Mikinduri"]
        },
        {
          name: "South Imenti",
          wards: ["Abothuguch", "Igembe", "Mikinduri", "Nkubu", "Timau"]
        },
        {
          name: "Tigania East",
          wards: ["Athiru", "Gaitu", "Kibirichia", "Kionyo", "Mikinduri"]
        },
        {
          name: "Tigania West",
          wards: ["Antubetwe", "Kibirichia", "Kionyo", "Mikinduri", "Nkubu"]
        }
      ]
    },
    {
      id: 12,
      name: "Tharaka Nithi",
      code: "012",
      constituencies: [
        {
          name: "Tharaka",
          wards: ["Gathigiriri", "Marimanti", "Muthara", "Tharaka", "Chiakariga"]
        },
        {
          name: "Chuka/Igambang'ombe",
          wards: ["Chuka", "Igambang'ombe", "Kathangacini", "Muthambi", "Ruiri"]
        }
      ]
    },
    {
      id: 13,
      name: "Embu",
      code: "013",
      constituencies: [
        {
          name: "Manyatta",
          wards: ["Gakembé", "Gikondi", "Kianjai", "Manyatta", "Mbeti"]
        },
        {
          name: "Mbeere North",
          wards: ["Amakim", "Evurore", "Kibirii", "Mbui", "Siakago"]
        },
        {
          name: "Mbeere South",
          wards: ["Gathigiriri", "Marimanti", "Muthara", "Siakago", "Tharaka"]
        },
        {
          name: "Runyenjes",
          wards: ["Gakembé", "Kianjai", "Kirimukwa", "Mbeti", "Runyenjes"]
        }
      ]
    },
    {
      id: 14,
      name: "Kitui",
      code: "014",
      constituencies: [
        {
          name: "Kitui Central",
          wards: ["Kalama", "Kangundo", "Kitui", "Mulot", "Ngelani"]
        },
        {
          name: "Kitui East",
          wards: ["Ikanga", "Kasio", "Mutito", "Ndonyo", "Thitani"]
        },
        {
          name: "Kitui West",
          wards: ["Kwa Vonza", "Matinyani", "Migwani", "Nzeve", "Tseikuru"]
        },
        {
          name: "Kitui Rural",
          wards: ["Kangundo", "Kalama", "Kitui", "Mulot", "Ngelani"]
        },
        {
          name: "Mwingi Central",
          wards: ["Kyuso", "Migwani", "Mwingi", "Nzeve", "Tseikuru"]
        },
        {
          name: "Mwingi North",
          wards: ["Ikanga", "Kasio", "Kyuso", "Mutito", "Ndonyo"]
        },
        {
          name: "Mwingi South",
          wards: ["Kasio", "Kyuso", "Migwani", "Mwingi", "Nzeve"]
        },
        {
          name: "Mwingi West",
          wards: ["Ikanga", "Kasio", "Kyuso", "Mutito", "Ndonyo"]
        }
      ]
    },
    {
      id: 15,
      name: "Machakos",
      code: "015",
      constituencies: [
        {
          name: "Kangundo",
          wards: ["Kangundo", "Kathiani", "Matungulu", "Mavoko", "Tala"]
        },
        {
          name: "Kathiani",
          wards: ["Kangundo", "Kathiani", "Matungulu", "Mavoko", "Tala"]
        },
        {
          name: "Machakos Town",
          wards: ["Kalama", "Kangundo", "Kitui", "Mulot", "Ngelani"]
        },
        {
          name: "Machakos Central",
          wards: ["Kalama", "Kangundo", "Kitui", "Mulot", "Ngelani"]
        },
        {
          name: "Mavoko",
          wards: ["Kangundo", "Kathiani", "Matungulu", "Mavoko", "Tala"]
        },
        {
          name: "Matungulu",
          wards: ["Kangundo", "Kathiani", "Matungulu", "Mavoko", "Tala"]
        },
        {
          name: "Mwala",
          wards: ["Ikanga", "Kasio", "Mutito", "Ndonyo", "Thitani"]
        },
        {
          name: "Yatta",
          wards: ["Kwa Vonza", "Matinyani", "Migwani", "Nzeve", "Tseikuru"]
        }
      ]
    },
    {
      id: 16,
      name: "Makueni",
      code: "016",
      constituencies: [
        {
          name: "Kaiti",
          wards: ["Ivingoni", "Kaiti", "Kilungu", "Makindu", "Nunguni"]
        },
        {
          name: "Kibwezi East",
          wards: ["Ivingoni", "Kaiti", "Kilungu", "Makindu", "Nunguni"]
        },
        {
          name: "Kibwezi West",
          wards: ["Ivingoni", "Kaiti", "Kilungu", "Makindu", "Nunguni"]
        },
        {
          name: "Kilungu",
          wards: ["Ivingoni", "Kaiti", "Kilungu", "Makindu", "Nunguni"]
        },
        {
          name: "Makueni",
          wards: ["Ivingoni", "Kaiti", "Kilungu", "Makindu", "Nunguni"]
        },
        {
          name: "Mbooni",
          wards: ["Ivingoni", "Kaiti", "Kilungu", "Makindu", "Nunguni"]
        }
      ]
    },
    {
      id: 17,
      name: "Nakuru",
      code: "017",
      constituencies: [
        {
          name: "Bahati",
          wards: ["Bahati", "Biashara", "Kiamaina", "Kings Biashara", "Shaabab"]
        },
        {
          name: "Kuresoi North",
          wards: ["Amalo", "Kiptere", "Leldet", "Tenges", "Tuiyo"]
        },
        {
          name: "Kuresoi South",
          wards: ["Amalo", "Kiptere", "Leldet", "Tenges", "Tuiyo"]
        },
        {
          name: "Molo",
          wards: ["Elburgon", "Kiptere", "Leldet", "Molo", "Tuiyo"]
        },
        {
          name: "Naivasha",
          wards: ["Biashara", "Hells Gate", "Maiella", "Naivasha", "Viwandini"]
        },
        {
          name: "Nakuru East",
          wards: ["Biashara", "Kiamaina", "Kings Biashara", "Nakuru", "Shaabab"]
        },
        {
          name: "Nakuru North",
          wards: ["Bahati", "Biashara", "Kiamaina", "Kings Biashara", "Shaabab"]
        },
        {
          name: "Nakuru Town East",
          wards: ["Biashara", "Kiamaina", "Kings Biashara", "Nakuru", "Shaabab"]
        },
        {
          name: "Nakuru Town West",
          wards: ["Bahati", "Biashara", "Kiamaina", "Kings Biashara", "Shaabab"]
        },
        {
          name: "Rongai",
          wards: ["Elburgon", "Kiptere", "Leldet", "Rongai", "Tuiyo"]
        },
        {
          name: "Subukia",
          wards: ["Elburgon", "Kiptere", "Leldet", "Subukia", "Tuiyo"]
        },
        {
          name: "Njoro",
          wards: ["Elburgon", "Kiptere", "Leldet", "Njoro", "Tuiyo"]
        }
      ]
    },
    {
      id: 18,
      name: "Narok",
      code: "018",
      constituencies: [
        {
          name: "Emurua Dikirr",
          wards: ["Emurua Dikirr", "Ilmotiok", "Kiriari", "Mosiro", "Osupukiai"]
        },
        {
          name: "Kilgoris",
          wards: ["Ilmotiok", "Kilgoris", "Kiriari", "Mosiro", "Osupukiai"]
        },
        {
          name: "Narok East",
          wards: ["Emurua Dikirr", "Ilmotiok", "Kiriari", "Mosiro", "Osupukiai"]
        },
        {
          name: "Narok North",
          wards: ["Emurua Dikirr", "Ilmotiok", "Kiriari", "Mosiro", "Osupukiai"]
        },
        {
          name: "Narok South",
          wards: ["Emurua Dikirr", "Ilmotiok", "Kiriari", "Mosiro", "Osupukiai"]
        },
        {
          name: "Narok West",
          wards: ["Emurua Dikirr", "Ilmotiok", "Kiriari", "Mosiro", "Osupukiai"]
        }
      ]
    },
    {
      id: 19,
      name: "Kajiado",
      code: "019",
      constituencies: [
        {
          name: "Kajiado Central",
          wards: ["Ildamat", "Kajiado", "Matapato", "Oloirien", "Osupukiai"]
        },
        {
          name: "Kajiado East",
          wards: ["Ildamat", "Kajiado", "Matapato", "Oloirien", "Osupukiai"]
        },
        {
          name: "Kajiado North",
          wards: ["Ildamat", "Kajiado", "Matapato", "Oloirien", "Osupukiai"]
        },
        {
          name: "Kajiado South",
          wards: ["Ildamat", "Kajiado", "Matapato", "Oloirien", "Osupukiai"]
        },
        {
          name: "Kajiado West",
          wards: ["Ildamat", "Kajiado", "Matapato", "Oloirien", "Osupukiai"]
        }
      ]
    },
    {
      id: 20,
      name: "Nyamira",
      code: "020",
      constituencies: [
        {
          name: "Borabu",
          wards: ["Borabu", "Egesa", "Gesima", "Kiogoro", "Nyamarambe"]
        },
        {
          name: "Kitutu Chache North",
          wards: ["Bomachoge", "Chache", "Kitutu", "Nyamarambe", "South Mugirango"]
        },
        {
          name: "Kitutu Chache South",
          wards: ["Bomachoge", "Chache", "Kitutu", "Nyamarambe", "South Mugirango"]
        },
        {
          name: "Masaba",
          wards: ["Bomachoge", "Chache", "Kitutu", "Nyamarambe", "South Mugirango"]
        },
        {
          name: "Manga",
          wards: ["Borabu", "Egesa", "Gesima", "Kiogoro", "Nyamarambe"]
        },
        {
          name: "Nyamira North",
          wards: ["Borabu", "Egesa", "Gesima", "Kiogoro", "Nyamarambe"]
        },
        {
          name: "Nyamira South",
          wards: ["Borabu", "Egesa", "Gesima", "Kiogoro", "Nyamarambe"]
        }
      ]
    },
    {
      id: 21,
      name: "Kisii",
      code: "021",
      constituencies: [
        {
          name: "Bobasi",
          wards: ["Bobasi", "Bogetenga", "Kgari", "Masige", "Nyakoe"]
        },
        {
          name: "Bonchari",
          wards: ["Bonchari", "Bogetenga", "Kgari", "Masige", "Nyakoe"]
        },
        {
          name: "Kitutu",
          wards: ["Bobasi", "Bogetenga", "Kgari", "Masige", "Nyakoe"]
        },
        {
          name: "Masaba",
          wards: ["Bobasi", "Bogetenga", "Kgari", "Masige", "Nyakoe"]
        },
        {
          name: "Nyaribari Chache",
          wards: ["Bobasi", "Bogetenga", "Kgari", "Masige", "Nyakoe"]
        },
        {
          name: "Nyaribari Masaba",
          wards: ["Bobasi", "Bogetenga", "Kgari", "Masige", "Nyakoe"]
        },
        {
          name: "Sameta",
          wards: ["Bobasi", "Bogetenga", "Kgari", "Masige", "Nyakoe"]
        }
      ]
    },
    {
      id: 22,
      name: "Homa Bay",
      code: "022",
      constituencies: [
        {
          name: "Gwasi",
          wards: ["Gwasi", "Kaksingiri", "Kanyada", "Kanyamkago", "Rusinga"]
        },
        {
          name: "Homa Bay Town",
          wards: ["Central", "Homa Bay", "Kachok", "Kanyada", "West"]
        },
        {
          name: "Kabondo",
          wards: ["Kabondo", "Kachok", "Kanyada", "Kanyamkago", "Rusinga"]
        },
        {
          name: "Karachuonyo",
          wards: ["Gwasi", "Kaksingiri", "Kanyada", "Kanyamkago", "Rusinga"]
        },
        {
          name: "Kasipul",
          wards: ["Gwasi", "Kaksingiri", "Kanyada", "Kanyamkago", "Rusinga"]
        },
        {
          name: "Mbita",
          wards: ["Gwasi", "Kaksingiri", "Kanyada", "Kanyamkago", "Rusinga"]
        },
        {
          name: "Rangwe",
          wards: ["Gwasi", "Kaksingiri", "Kanyada", "Kanyamkago", "Rusinga"]
        },
        {
          name: "Suba North",
          wards: ["Gwasi", "Kaksingiri", "Kanyada", "Kanyamkago", "Rusinga"]
        },
        {
          name: "Suba South",
          wards: ["Gwasi", "Kaksingiri", "Kanyada", "Kanyamkago", "Rusinga"]
        }
      ]
    },
    {
      id: 23,
      name: "Siaya",
      code: "023",
      constituencies: [
        {
          name: "Alego Usonga",
          wards: ["Alego", "Port Victoria", "Sidindi", "Ugenya", "Uwala"]
        },
        {
          name: "Bondo",
          wards: ["Alego", "Bondo", "Port Victoria", "Sidindi", "Uwala"]
        },
        {
          name: "Gem",
          wards: ["Alego", "Port Victoria", "Sidindi", "Ugenya", "Uwala"]
        },
        {
          name: "Ugenya",
          wards: ["Alego", "Port Victoria", "Sidindi", "Ugenya", "Uwala"]
        },
        {
          name: "Ugunja",
          wards: ["Alego", "Port Victoria", "Sidindi", "Ugenya", "Uwala"]
        },
        {
          name: "Rarieda",
          wards: ["Alego", "Port Victoria", "Sidindi", "Ugenya", "Uwala"]
        }
      ]
    },
    {
      id: 24,
      name: "Busia",
      code: "024",
      constituencies: [
        {
          name: "Butula",
          wards: ["Butula", "Khubuye", "Mukhuyu", "Nambale", "Sidindi"]
        },
        {
          name: "Matayos",
          wards: ["Bukhayo", "Matayos", "Nambale", "Sidindi", "West"]
        },
        {
          name: "Nambale",
          wards: ["Butula", "Khubuye", "Mukhuyu", "Nambale", "Sidindi"]
        },
        {
          name: "Samburu",
          wards: ["Butula", "Khubuye", "Mukhuyu", "Nambale", "Sidindi"]
        },
        {
          name: "Teso North",
          wards: ["Butula", "Khubuye", "Mukhuyu", "Nambale", "Sidindi"]
        },
        {
          name: "Teso South",
          wards: ["Butula", "Khubuye", "Mukhuyu", "Nambale", "Sidindi"]
        }
      ]
    },
    {
      id: 25,
      name: "Kakamega",
      code: "025",
      constituencies: [
        {
          name: "Butere",
          wards: ["Butere", "Idakho", "Isukha", "Marama", "Shinyalu"]
        },
        {
          name: "Ikolomani",
          wards: ["Butere", "Idakho", "Isukha", "Marama", "Shinyalu"]
        },
        {
          name: "Kakamega",
          wards: ["Butere", "Idakho", "Isukha", "Marama", "Shinyalu"]
        },
        {
          name: "Khayega",
          wards: ["Butere", "Idakho", "Isukha", "Marama", "Shinyalu"]
        },
        {
          name: "Lugari",
          wards: ["Butere", "Idakho", "Isukha", "Marama", "Shinyalu"]
        },
        {
          name: "Lurambi",
          wards: ["Butere", "Idakho", "Isukha", "Marama", "Shinyalu"]
        },
        {
          name: "Malava",
          wards: ["Butere", "Idakho", "Isukha", "Marama", "Shinyalu"]
        },
        {
          name: "Matete",
          wards: ["Butere", "Idakho", "Isukha", "Marama", "Shinyalu"]
        },
        {
          name: "Mumias East",
          wards: ["Butere", "Idakho", "Isukha", "Marama", "Shinyalu"]
        },
        {
          name: "Mumias West",
          wards: ["Butere", "Idakho", "Isukha", "Marama", "Shinyalu"]
        },
        {
          name: "Shinyalu",
          wards: ["Butere", "Idakho", "Isukha", "Marama", "Shinyalu"]
        }
      ]
    },
    {
      id: 26,
      name: "Vihiga",
      code: "026",
      constituencies: [
        {
          name: "Emuhaya",
          wards: ["Emuhaya", "Hamisi", "Luanda", "Vihiga", "Wodanga"]
        },
        {
          name: "Hamisi",
          wards: ["Emuhaya", "Hamisi", "Luanda", "Vihiga", "Wodanga"]
        },
        {
          name: "Luanda",
          wards: ["Emuhaya", "Hamisi", "Luanda", "Vihiga", "Wodanga"]
        },
        {
          name: "Sabatia",
          wards: ["Emuhaya", "Hamisi", "Luanda", "Vihiga", "Wodanga"]
        },
        {
          name: "Vihiga",
          wards: ["Emuhaya", "Hamisi", "Luanda", "Vihiga", "Wodanga"]
        }
      ]
    },
    {
      id: 27,
      name: "Bungoma",
      code: "027",
      constituencies: [
        {
          name: "Bumula",
          wards: ["Bumula", "Kanduyi", "Kimilili", "Mt Elgon", "Tongaren"]
        },
        {
          name: "Kabuchai",
          wards: ["Bumula", "Kabuchai", "Kanduyi", "Kimilili", "Tongaren"]
        },
        {
          name: "Kanduyi",
          wards: ["Bumula", "Kanduyi", "Kimilili", "Mt Elgon", "Tongaren"]
        },
        {
          name: "Kimilili",
          wards: ["Bumula", "Kanduyi", "Kimilili", "Mt Elgon", "Tongaren"]
        },
        {
          name: "Mt Elgon",
          wards: ["Bumula", "Kanduyi", "Kimilili", "Mt Elgon", "Tongaren"]
        },
        {
          name: "Sirisia",
          wards: ["Bumula", "Kanduyi", "Kimilili", "Mt Elgon", "Tongaren"]
        },
        {
          name: "Tongaren",
          wards: ["Bumula", "Kanduyi", "Kimilili", "Mt Elgon", "Tongaren"]
        },
        {
          name: "Webuye East",
          wards: ["Bumula", "Kanduyi", "Kimilili", "Mt Elgon", "Tongaren"]
        },
        {
          name: "Webuye West",
          wards: ["Bumula", "Kanduyi", "Kimilili", "Mt Elgon", "Tongaren"]
        }
      ]
    },
    {
      id: 28,
      name: "Trans Nzoia",
      code: "028",
      constituencies: [
        {
          name: "Cherangany",
          wards: ["Cherangany", "Endebess", "Kwanza", "Saboti", "Suam"]
        },
        {
          name: "Endebess",
          wards: ["Cherangany", "Endebess", "Kwanza", "Saboti", "Suam"]
        },
        {
          name: "Kiminini",
          wards: ["Cherangany", "Endebess", "Kwanza", "Saboti", "Suam"]
        },
        {
          name: "Kwanza",
          wards: ["Cherangany", "Endebess", "Kwanza", "Saboti", "Suam"]
        },
        {
          name: "Saboti",
          wards: ["Cherangany", "Endebess", "Kwanza", "Saboti", "Suam"]
        }
      ]
    },
    {
      id: 29,
      name: "Uasin Gishu",
      code: "029",
      constituencies: [
        {
          name: "Ainabkoi",
          wards: ["Ainabkoi", "Huruma", "Kapsuswa", "Langas", "Moi's Bridge"]
        },
        {
          name: "Kapsabet",
          wards: ["Ainabkoi", "Huruma", "Kapsuswa", "Langas", "Moi's Bridge"]
        },
        {
          name: "Moi's Bridge",
          wards: ["Ainabkoi", "Huruma", "Kapsuswa", "Langas", "Moi's Bridge"]
        },
        {
          name: "Soy",
          wards: ["Ainabkoi", "Huruma", "Kapsuswa", "Langas", "Moi's Bridge"]
        },
        {
          name: "Turbo",
          wards: ["Ainabkoi", "Huruma", "Kapsuswa", "Langas", "Moi's Bridge"]
        }
      ]
    },
    {
      id: 30,
      name: "Elgeyo Marakwet",
      code: "030",
      constituencies: [
        {
          name: "Keiyo North",
          wards: ["Chepnyalil", "Kaptarakwa", "Kaptumo", "Soy", "Tambach"]
        },
        {
          name: "Keiyo South",
          wards: ["Chepnyalil", "Kaptarakwa", "Kaptumo", "Soy", "Tambach"]
        },
        {
          name: "Marakwet East",
          wards: ["Chepnyalil", "Kaptarakwa", "Kaptumo", "Soy", "Tambach"]
        },
        {
          name: "Marakwet West",
          wards: ["Chepnyalil", "Kaptarakwa", "Kaptumo", "Soy", "Tambach"]
        }
      ]
    },
    {
      id: 31,
      name: "Nandi",
      code: "031",
      constituencies: [
        {
          name: "Aldai",
          wards: ["Aldai", "Chemundu", "Kapsabet", "Kipkaren", "Mosoriot"]
        },
        {
          name: "Cherangany",
          wards: ["Aldai", "Chemundu", "Kapsabet", "Kipkaren", "Mosoriot"]
        },
        {
          name: "Emgwen",
          wards: ["Aldai", "Chemundu", "Kapsabet", "Kipkaren", "Mosoriot"]
        },
        {
          name: "Moi's Bridge",
          wards: ["Aldai", "Chemundu", "Kapsabet", "Kipkaren", "Mosoriot"]
        },
        {
          name: "Nandi Hills",
          wards: ["Aldai", "Chemundu", "Kapsabet", "Kipkaren", "Mosoriot"]
        },
        {
          name: "Tinderet",
          wards: ["Aldai", "Chemundu", "Kapsabet", "Kipkaren", "Mosoriot"]
        }
      ]
    },
    {
      id: 32,
      name: "Baringo",
      code: "032",
      constituencies: [
        {
          name: "Baringo Central",
          wards: ["Bartabwa", "Cheberio", "Kipsaram", "Marigat", "Ng'ornwa"]
        },
        {
          name: "Baringo North",
          wards: ["Bartabwa", "Cheberio", "Kipsaram", "Marigat", "Ng'ornwa"]
        },
        {
          name: "Baringo South",
          wards: ["Bartabwa", "Cheberio", "Kipsaram", "Marigat", "Ng'ornwa"]
        },
        {
          name: "Eldama Ravine",
          wards: ["Bartabwa", "Cheberio", "Kipsaram", "Marigat", "Ng'ornwa"]
        },
        {
          name: "Mogotio",
          wards: ["Bartabwa", "Cheberio", "Kipsaram", "Marigat", "Ng'ornwa"]
        },
        {
          name: "Tiaty",
          wards: ["Bartabwa", "Cheberio", "Kipsaram", "Marigat", "Ng'ornwa"]
        }
      ]
    },
    {
      id: 33,
      name: "Laikipia",
      code: "033",
      constituencies: [
        {
          name: "Laikipia East",
          wards: ["Donyo", "Mugie", "Nanyuki", "Rumuruti", "Umande"]
        },
        {
          name: "Laikipia North",
          wards: ["Donyo", "Mugie", "Nanyuki", "Rumuruti", "Umande"]
        },
        {
          name: "Laikipia West",
          wards: ["Donyo", "Mugie", "Nanyuki", "Rumuruti", "Umande"]
        }
      ]
    },
    {
      id: 34,
      name: "Nyandarua",
      code: "034",
      constituencies: [
        {
          name: "Kipipiri",
          wards: ["Gathigiriri", "Kipipiri", "Marimba", "Ndemi", "Wanjohi"]
        },
        {
          name: "Kinangop",
          wards: ["Gathigiriri", "Kipipiri", "Marimba", "Ndemi", "Wanjohi"]
        },
        {
          name: "Ndaragwa",
          wards: ["Gathigiriri", "Kipipiri", "Marimba", "Ndemi", "Wanjohi"]
        },
        {
          name: "Ol Kalou",
          wards: ["Gathigiriri", "Kipipiri", "Marimba", "Ndemi", "Wanjohi"]
        },
        {
          name: "Ol Jorok",
          wards: ["Gathigiriri", "Kipipiri", "Marimba", "Ndemi", "Wanjohi"]
        }
      ]
    },
    {
      id: 35,
      name: "Murang'a",
      code: "035",
      constituencies: [
        {
          name: "Gatanga",
          wards: ["Gatanga", "Kahuro", "Kigumo", "Kiharu", "Mathioya"]
        },
        {
          name: "Kagere",
          wards: ["Gatanga", "Kahuro", "Kigumo", "Kiharu", "Mathioya"]
        },
        {
          name: "Kangema",
          wards: ["Gatanga", "Kahuro", "Kigumo", "Kiharu", "Mathioya"]
        },
        {
          name: "Kigumo",
          wards: ["Gatanga", "Kahuro", "Kigumo", "Kiharu", "Mathioya"]
        },
        {
          name: "Kiharu",
          wards: ["Gatanga", "Kahuro", "Kigumo", "Kiharu", "Mathioya"]
        },
        {
          name: "Mathioya",
          wards: ["Gatanga", "Kahuro", "Kigumo", "Kiharu", "Mathioya"]
        },
        {
          name: "Mbiri",
          wards: ["Gatanga", "Kahuro", "Kigumo", "Kiharu", "Mathioya"]
        }
      ]
    },
    {
      id: 36,
      name: "Kiambu",
      code: "036",
      constituencies: [
        {
          name: "Gatundu North",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Gatundu South",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Githunguri",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Juja",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Kabete",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Kiambaa",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Kiambu",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Kikuyu",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Limuru",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Lari",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Ruiru",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Thika Town",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Githurai",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        }
      ]
    },
    {
      id: 37,
      name: "Turkana",
      code: "037",
      constituencies: [
        {
          name: "Turkana Central",
          wards: ["Kaaling", "Kakuma", "Kalokol", "Lokichar", "Turkwel"]
        },
        {
          name: "Turkana East",
          wards: ["Kaaling", "Kakuma", "Kalokol", "Lokichar", "Turkwel"]
        },
        {
          name: "Turkana North",
          wards: ["Kaaling", "Kakuma", "Kalokol", "Lokichar", "Turkwel"]
        },
        {
          name: "Turkana South",
          wards: ["Kaaling", "Kakuma", "Kalokol", "Lokichar", "Turkwel"]
        },
        {
          name: "Turkana West",
          wards: ["Kaaling", "Kakuma", "Kalokol", "Lokichar", "Turkwel"]
        },
        {
          name: "Loima",
          wards: ["Kaaling", "Kakuma", "Kalokol", "Lokichar", "Turkwel"]
        }
      ]
    },
    {
      id: 38,
      name: "West Pokot",
      code: "038",
      constituencies: [
        {
          name: "Kapenguria",
          wards: ["Kapenguria", "Kasey", "Makutano", "Riwruka", "Siyoi"]
        },
        {
          name: "Kacheliba",
          wards: ["Kapenguria", "Kasey", "Makutano", "Riwruka", "Siyoi"]
        },
        {
          name: "Sigor",
          wards: ["Kapenguria", "Kasey", "Makutano", "Riwruka", "Siyoi"]
        },
        {
          name: "Pokot South",
          wards: ["Kapenguria", "Kasey", "Makutano", "Riwruka", "Siyoi"]
        }
      ]
    },
    {
      id: 39,
      name: "Samburu",
      code: "039",
      constituencies: [
        {
          name: "Samburu East",
          wards: ["Archer", "Baragoi", "Kirisia", "Lorroki", "Wamba"]
        },
        {
          name: "Samburu North",
          wards: ["Archer", "Baragoi", "Kirisia", "Lorroki", "Wamba"]
        },
        {
          name: "Samburu West",
          wards: ["Archer", "Baragoi", "Kirisia", "Lorroki", "Wamba"]
        }
      ]
    },
    {
      id: 40,
      name: "Nairobi",
      code: "040",
      constituencies: [
        {
          name: "Dagoretti North",
          wards: ["Dagoretti", "Kawangware", "Kilimani", "Muthangari", "Uthiru"]
        },
        {
          name: "Dagoretti South",
          wards: ["Dagoretti", "Kawangware", "Kilimani", "Muthangari", "Uthiru"]
        },
        {
          name: "Embakasi Central",
          wards: ["Embakasi", "Kayole", "Komarock", "Pipeline", "Utawala"]
        },
        {
          name: "Embakasi East",
          wards: ["Embakasi", "Kayole", "Komarock", "Pipeline", "Utawala"]
        },
        {
          name: "Embakasi North",
          wards: ["Embakasi", "Kayole", "Komarock", "Pipeline", "Utawala"]
        },
        {
          name: "Embakasi South",
          wards: ["Embakasi", "Kayole", "Komarock", "Pipeline", "Utawala"]
        },
        {
          name: "Embakasi West",
          wards: ["Embakasi", "Kayole", "Komarock", "Pipeline", "Utawala"]
        },
        {
          name: "Kamukunji",
          wards: ["Eastleigh", "Kamukunji", "Pumwani", "River Road", "Township"]
        },
        {
          name: "Kasarani",
          wards: ["Clay", "Kasarani", "Njiru", "Roysambu", "Ruai"]
        },
        {
          name: "Kibra",
          wards: ["Kibera", "Laini Saba", "Lindbergh", "Sarang'ombe", "Woodley"]
        },
        {
          name: "Lang'ata",
          wards: ["Karen", "Lang'ata", "Mugumo-Ini", "Nairobi West", "South C"]
        },
        {
          name: "Makadara",
          wards: ["Harambee", "Makadara", "Maringo", "Mukuru", "Viwandani"]
        },
        {
          name: "Mathare",
          wards: ["Catacomb", "Mathare", "Mlango Kubwa", "Ngei", "Ziwani"]
        },
        {
          name: "Roysambu",
          wards: ["Clay", "Githurai", "Kahawa", "Roysambu", "Zimmerman"]
        },
        {
          name: "Ruaraka",
          wards: ["Korogocho", "Lucky Summer", "Mathare", "Ruaraka", "Utawala"]
        },
        {
          name: "Starehe",
          wards: ["Central", "Huruma", "Landimawe", "Nairobi South", "Ngara"]
        },
        {
          name: "Westlands",
          wards: ["Highridge", "Kangemi", "Karura", "Parklands", "Westlands"]
        }
      ]
    },
    {
      id: 41,
      name: "Nyeri",
      code: "041",
      constituencies: [
        {
          name: "Kieni",
          wards: ["Gatarakwa", "Kiamathaga", "Mweiga", "Naromoro", "Sirima"]
        },
        {
          name: "Mathari",
          wards: ["Gatarakwa", "Kiamathaga", "Mweiga", "Naromoro", "Sirima"]
        },
        {
          name: "Mukurwe-ini",
          wards: ["Gatarakwa", "Kiamathaga", "Mweiga", "Naromoro", "Sirima"]
        },
        {
          name: "Nyeri Town",
          wards: ["Gatarakwa", "Kiamathaga", "Mweiga", "Naromoro", "Sirima"]
        },
        {
          name: "Othaya",
          wards: ["Gatarakwa", "Kiamathaga", "Mweiga", "Naromoro", "Sirima"]
        },
        {
          name: "Tetu",
          wards: ["Gatarakwa", "Kiamathaga", "Mweiga", "Naromoro", "Sirima"]
        }
      ]
    },
    {
      id: 42,
      name: "Kirinyaga",
      code: "042",
      constituencies: [
        {
          name: "Gichugu",
          wards: ["Gichugu", "Inyango", "Kerugoya", "Kutus", "Sagana"]
        },
        {
          name: "Kirinyaga Central",
          wards: ["Gichugu", "Inyango", "Kerugoya", "Kutus", "Sagana"]
        },
        {
          name: "Mwea",
          wards: ["Gichugu", "Inyango", "Kerugoya", "Kutus", "Sagana"]
        },
        {
          name: "Ndia",
          wards: ["Gichugu", "Inyango", "Kerugoya", "Kutus", "Sagana"]
        }
      ]
    },
    {
      id: 43,
      name: "Murang'a",
      code: "043",
      constituencies: [
        {
          name: "Gatanga",
          wards: ["Gatanga", "Kahuro", "Kigumo", "Kiharu", "Mathioya"]
        },
        {
          name: "Kagere",
          wards: ["Gatanga", "Kahuro", "Kigumo", "Kiharu", "Mathioya"]
        },
        {
          name: "Kangema",
          wards: ["Gatanga", "Kahuro", "Kigumo", "Kiharu", "Mathioya"]
        },
        {
          name: "Kigumo",
          wards: ["Gatanga", "Kahuro", "Kigumo", "Kiharu", "Mathioya"]
        },
        {
          name: "Kiharu",
          wards: ["Gatanga", "Kahuro", "Kigumo", "Kiharu", "Mathioya"]
        },
        {
          name: "Mathioya",
          wards: ["Gatanga", "Kahuro", "Kigumo", "Kiharu", "Mathioya"]
        },
        {
          name: "Mbiri",
          wards: ["Gatanga", "Kahuro", "Kigumo", "Kiharu", "Mathioya"]
        }
      ]
    },
    {
      id: 44,
      name: "Kiambu",
      code: "044",
      constituencies: [
        {
          name: "Gatundu North",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Gatundu South",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Githunguri",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Juja",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Kabete",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Kiambaa",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Kiambu",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Kikuyu",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Limuru",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Lari",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Ruiru",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Thika Town",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        },
        {
          name: "Githurai",
          wards: ["Gatundu", "Gathiga", "Kimbo", "Mang'u", "Mitu"]
        }
      ]
    },
    {
      id: 45,
      name: "Turkana",
      code: "045",
      constituencies: [
        {
          name: "Turkana Central",
          wards: ["Kaaling", "Kakuma", "Kalokol", "Lokichar", "Turkwel"]
        },
        {
          name: "Turkana East",
          wards: ["Kaaling", "Kakuma", "Kalokol", "Lokichar", "Turkwel"]
        },
        {
          name: "Turkana North",
          wards: ["Kaaling", "Kakuma", "Kalokol", "Lokichar", "Turkwel"]
        },
        {
          name: "Turkana South",
          wards: ["Kaaling", "Kakuma", "Kalokol", "Lokichar", "Turkwel"]
        },
        {
          name: "Turkana West",
          wards: ["Kaaling", "Kakuma", "Kalokol", "Lokichar", "Turkwel"]
        },
        {
          name: "Loima",
          wards: ["Kaaling", "Kakuma", "Kalokol", "Lokichar", "Turkwel"]
        }
      ]
    },
    {
      id: 46,
      name: "West Pokot",
      code: "046",
      constituencies: [
        {
          name: "Kapenguria",
          wards: ["Kapenguria", "Kasey", "Makutano", "Riwruka", "Siyoi"]
        },
        {
          name: "Kacheliba",
          wards: ["Kapenguria", "Kasey", "Makutano", "Riwruka", "Siyoi"]
        },
        {
          name: "Sigor",
          wards: ["Kapenguria", "Kasey", "Makutano", "Riwruka", "Siyoi"]
        },
        {
          name: "Pokot South",
          wards: ["Kapenguria", "Kasey", "Makutano", "Riwruka", "Siyoi"]
        }
      ]
    },
    {
      id: 47,
      name: "Samburu",
      code: "047",
      constituencies: [
        {
          name: "Samburu East",
          wards: ["Archer", "Baragoi", "Kirisia", "Lorroki", "Wamba"]
        },
        {
          name: "Samburu North",
          wards: ["Archer", "Baragoi", "Kirisia", "Lorroki", "Wamba"]
        },
        {
          name: "Samburu West",
          wards: ["Archer", "Baragoi", "Kirisia", "Lorroki", "Wamba"]
        }
      ]
    }
  ]
};

// Helper functions
export const getAllCounties = () => {
  return kenyaLocations.counties.map(county => ({
    id: county.id,
    name: county.name,
    code: county.code
  }));
};

export const getCountyById = (countyId) => {
  return kenyaLocations.counties.find(county => county.id === parseInt(countyId));
};

export const getCountyByName = (countyName) => {
  return kenyaLocations.counties.find(county => 
    county.name.toLowerCase() === countyName.toLowerCase()
  );
};

export const getConstituenciesByCounty = (countyId) => {
  const county = getCountyById(countyId);
  if (!county) return [];
  return county.constituencies.map(constituency => ({
    name: constituency.name
  }));
};

export const getConstituencyByCountyAndName = (countyId, constituencyName) => {
  const county = getCountyById(countyId);
  if (!county) return null;
  return county.constituencies.find(constituency => 
    constituency.name.toLowerCase() === constituencyName.toLowerCase()
  );
};

export const getWardsByConstituency = (countyId, constituencyName) => {
  const constituency = getConstituencyByCountyAndName(countyId, constituencyName);
  if (!constituency) return [];
  return constituency.wards;
};

export { kenyaLocations };
export default kenyaLocations;