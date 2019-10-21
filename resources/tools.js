//Helper objects for look ups and valu changes



//helper functions that converts or ensurs that input is validated before making the SQL query
module.exports =
{
  getPopData: (demo) =>
  {
    const column_name = {
      'ball': 'CAST(SUM(TOT_POP) AS SIGNED) AS POP',
      'fall': 'CAST(SUM(TOT_FEMALE) AS SIGNED) AS POP',
      'mall': 'CAST(SUM(TOT_MALE) AS SIGNED) AS POP',
      'bwh': 'CAST(SUM(WAC_FEMALE) AS SIGNED) + CAST(SUM(WAC_MALE) AS SIGNED) AS POP',
      'fwh': 'CAST(SUM(WAC_FEMALE) AS SIGNED) AS POP',
      'mwh': 'CAST(SUM(WAC_MALE) AS SIGNED) AS POP',
      'bbl': 'CAST(SUM(BAC_FEMALE) AS SIGNED) + CAST(SUM(BAC_MALE) AS SIGNED) AS POP',
      'fbl': 'CAST(SUM(BAC_FEMALE) AS SIGNED) AS POP',
      'mbl': 'CAST(SUM(BAC_MALE) AS SIGNED) AS POP',
      'bas': 'CAST(SUM(AAC_FEMALE) AS SIGNED) + CAST(SUM(AAC_MALE) AS SIGNED) AS POP',
      'fas': 'CAST(SUM(AAC_FEMALE) AS SIGNED) AS POP',
      'mas': 'CAST(SUM(AAC_MALE) AS SIGNED) AS POP',
      'bhi': 'CAST(SUM(H_FEMALE) AS SIGNED) + CAST(SUM(H_MALE) AS SIGNED) AS POP',
      'fhi': 'CAST(SUM(H_FEMALE) AS SIGNED) AS POP',
      'mhi': 'CAST(SUM(H_MALE) AS SIGNED) AS POP',
      'default': null
    };
    return (column_name[demo] || column_name['default']);
  },

  get_us_state_from_num: (num) =>
  {
    const us_num_to_state = {
                    "01":"Alabama", "02":"Alaska", "04":"Arizona",
                    "05":"Arkansas", "06":"California", "08":"Colorado",
                    "09":"Connecticut", "10":"Delaware",
                    "11":"District of Columbia", "12":"Florda", "13":"Georgia",
                    "15":"Hawaii", "16":"Idaho", "17":"Illinois",
                    "18":"Indiana", "19":"Iowa", "20":"Kansas", "21":"Kentucky",
                    "22":"Louisiana", "23":"Maine", "24":"Maryland",
                    "25":"Massachusetts", "26":"Michigan", "27":"Minnesota",
                    "28":"Mississippi", "29":"Missouri", "30":"Montana",
                    "31":"Nebraska", "32":"Nevada", "33":"New Hampshire",
                    "34":"New Jersey", "35":"New Mexico", "36":"New York",
                    "37":"North Carolina", "38":"North Dakota", "39":"Ohio",
                    "40":"Oklahoma", "41":"Oregon", "42":"Pennsylvania",
                    "44":"Rhode Island", "45":"South Carolina",
                    "46":"South Dakota", "47":"Tennessee", "48":"Texas",
                    "49":"Utah", "50":"Vermont", "51":"Virginia",
                    "53":"Washington", "54":"West Virginia", "55":"Wisconsin",
                    "56":"Wyoming", "72":"Puerto Rico", "default":null
                    };
    return (us_num_to_state[num] || us_num_to_state['default']);
  },

  get_us_num_from_state: (state) =>
  {
    const us_state_to_num = {
                    'ALABAMA':'01','ALASKA':'02','ARIZONA':'04',
                    'ARKANSAS': '05','CALIFORNIA':'06', 'COLORADO':'08',
                    'CONNECTICUT':'09', 'DELAWARE':'10',
                    'DISTRICT OF COLUMBIA':'11', 'FLORDA':'12', 'GEORGIA':'13',
                    'HAWAII':'15', 'IDAHO':'16', 'ILLINOIS':'17',
                    'INDIANA':'18', 'IOWA':'19', 'KANSAS':'20', 'KENTUCKY':'21',
                    'LOUISIANA':'22', 'MAINE':'23', 'MARYLAND':'24',
                    'MASSACHUSETTS':'25', 'MICHIGAN':'26', 'MINNESOTA':'27',
                    'MISSISSIPPI':'28', 'MISSOURI':'29', 'MONTANA':'30',
                    'NEBRASKA':'31', 'NEVADA':'32', 'NEW HAMPSHIRE':'33',
                    'NEW JERSEY':'34', 'NEW MEXICO':'35', 'NEW YORK':'36',
                    'NORTH CAROLINA':'37', 'NORTH DAKOTA':'38', 'OHIO':'39',
                    'OKLAHOMA':'40', 'OREGON':'41', 'PENNSYLVANIA':'42',
                    'RHODE ISLAND':'44', 'SOUTH CAROLINA':'45',
                    'SOUTH DAKOTA':'46', 'TENNESSEE':'47', 'TEXAS':'48',
                    'UTAH':'49', 'VERMONT':'50', 'VIRGINIA':'51',
                    'WASHINGTON':'53', 'WEST VIRGINIA':'54', 'WISCONSIN':'55',
                    'WYOMING':'56', 'PUERTO RICO':'72', "DEFAULT":null
                    };
  return (us_state_to_num[state] || us_state_to_num['DEFAULT']);
  },

  get_us_ab_from_state: (state) =>
  {
    const us_state_to_ab = {
                  'ALABAMA': 'AL', 'ALASKA': 'AK', 'ARIZONA': 'AZ',
                  'ARKANSAS': 'AR', 'CALIFORNIA': 'CA', 'COLORADO': 'CO',
                  'CONNECTICUT': 'CT', 'DELAWARE': 'DE',
                  'DISTRICT OF COLUMBIA': 'DC', 'FLORIDA': 'FL', 'GEORGIA': 'GA',
                  'HAWAII': 'HI', 'IDAHO': 'ID', 'ILLINOIS': 'IL',
                  'INDIANA': 'IN', 'IOWA': 'IA', 'KANSAS': 'KS', 'KENTUCKY': 'KY',
                  'LOUISIANA': 'LA', 'MAINE': 'ME', 'MARYLAND': 'MD',
                  'MASSACHUSETTS': 'MA', 'MICHIGAN': 'MI', 'MINNESOTA': 'MN',
                  'MISSISSIPPI': 'MS', 'MISSOURI': 'MO', 'MONTANA': 'MT',
                  'NEBRASKA': 'NE', 'NEVADA': 'NV', 'NEW HAMPSHIRE': 'NH',
                  'NEW JERSEY': 'NJ', 'NEW MEXICO': 'NM', 'NEW YORK': 'NY',
                  'NORTH CAROLINA': 'NC', 'NORTH DAKOTA': 'ND',
                  'NORTHERN MARIANA ISLANDS':'MP', 'OHIO': 'OH', 'OKLAHOMA': 'OK',
                  'OREGON': 'OR', 'PALAU': 'PW', 'PENNSYLVANIA': 'PA',
                  'PUERTO RICO': 'PR', 'RHODE ISLAND': 'RI',
                  'SOUTH CAROLINA': 'SC', 'SOUTH DAKOTA': 'SD', 'TENNESSEE': 'TN',
                  'TEXAS': 'TX', 'UTAH': 'UT', 'VERMONT': 'VT',
                  'VIRGIN ISLANDS': 'VI', 'VIRGINIA': 'VA', 'WASHINGTON': 'WA',
                  'WEST VIRGINIA': 'WV', 'WISCONSIN': 'WI', 'WYOMING': 'WY', "DEFAULT":NULL
                  };
  return (us_state_to_ab[state] || us_state_to_ab['DEFAULT']);
  },

  get_us_ab_from_state: (ab) =>
  {
    const us_ab_to_state = {
                  'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona',
                  'AR': 'Arkansas', 'CA': 'California', 'CO': 'Colorado',
                  'CT': 'Connecticut', 'DE': 'Delaware',
                  'DC': 'District of Columbia', 'FL': 'Florida', 'GA': 'Georgia',
                  'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois',
                  'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas', 'KY': 'Kentucky',
                  'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
                  'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota',
                  'MS': 'Mississippi', 'MO': 'Missouri', 'MT': 'Montana',
                  'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire',
                  'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
                  'NC': 'North Carolina', 'ND': 'North Dakota',
                  'MP': 'Northern Mariana Islands', 'OH': 'Ohio', 'OK': 'Oklahoma',
                  'OR': 'Oregon', 'PW': 'Palau', 'PA': 'Pennsylvania',
                  'PR': 'Puerto Rico', 'RI': 'Rhode Island', 'SC': 'South Carolina',
                  'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas',
                  'UT': 'Utah', 'VT': 'Vermont', 'VI': 'Virgin Islands',
                  'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
                  'WI': 'Wisconsin', 'WY': 'Wyoming', "default":null
                  };
  return (us_ab_to_state[ab] || us_ab_to_state['default']);
  },

  verify_age: function(age)
  {
    const v_age = {
      '0':'0', '1':'1', '2':'2', '3':'3', '4':'4', '5':'5', '6':'6', '7':'7',
      '8':'8', '9':'9', '10':'10', '11':'11', '12':'12', '13':'13', '14':'14',
      '15':'15', '16':'16', '17':'17', '18':'18', 'default':null
    };
    return (v_age[age] || v_age['default']);
  },

  verify_year: year =>
  {
    const v_year = {
      '0':'0', '1':'1', '2':'2', '3':'3', '4':'4', '5':'5', '6':'6', '7':'7',
      '8':'8', '9':'9', '10':'10', '11':'11', 'default':null
    };
    return (v_year[year] || v_year['default']);
  }

















}
