from app.models import db, StockDiscussion


def seed_stock_discussions():
    tickers = ['AAPL',
'MSFT',
'AMZN',
'GOOGL',
'GOOG',
'TSLA',
'NVDA',
'FB',
'JPM',
'UNH',
'JNJ',
'V',
'PG',
'HD',
'BAC',
'MA',
'XOM',
'DIS',
'PFE',
'CVX',
'ABBV',
'AVGO',
'KO',
'WFC',
'PEP',
'CSCO',
'ADBE',
'COST',
'VZ',
'CMCSA',
'TMO',
'ABT',
'CRM',
'ACN',
'AMD',
'INTC',
'MRK',
'QCOM',
'LLY',
'WMT',
'MCD',
'NKE',
'NFLX',
'T',
'DHR',
'PM',
'UNP',
'UPS',
'LOW',
'LIN',
'TXN',
'BMY',
'INTU',
'MS',
'NEE',
'RTX',
'MDT',
'PYPL',
'CVS',
'SCHW',
'C',
'HON',
'ORCL',
'AMGN',
'AMAT',
'AXP',
'GS',
'BA',
'COP',
'NOW',
'IBM',
'BLK',
'DE',
'SBUX',
'GE',
'CAT',
'ANTM',
'BKNG',
'MU',
'PLD',
'AMT',
'ISRG',
'TGT',
'LMT',
'ZTS',
'SPGI',
'MO',
'MDLZ',
'MMM',
'PNC',
'CB',
'ADI',
'SYK',
'TFC',
'ADP',
'CME',
'LRCX',
'TJX',
'USB',
'BDX',
'MMC',
'GILD',
'CSX',
'DUK',
'CI',
'CHTR',
'TMUS',
'GM',
'CCI',
'EL',
'F',
'ICE',
'EW',
'SO',
'COF',
'NSC',
'CL',
'REGN',
'SHW',
'EOG',
'FCX',
'ATVI',
'D',
'ITW',
'AON',
'FIS',
'BSX',
'ETN',
'PGR',
'EQIX',
'VRTX',
'KLAC',
'HCA',
'FISV',
'NOC',
'FDX',
'EMR',
'SLB',
'WM',
'APD',
'HUM',
'ILMN',
'PSA',
'MCO',
'MRNA',
'NXPI',
'MET',
'ADSK',
'NEM',
'AIG',
'PXD',
'MAR',
'GD',
'CNC',
'TEL',
'MPC',
'JCI',
'BK',
'CTSH',
'DG',
'SNPS',
'ROP',
'SPG',
'DOW',
'APH',
'ECL',
'ORLY',
'MSCI',
'PRU',
'KMB',
'HLT',
'CMG',
'IQV',
'FTNT',
'IDXX',
'INFO',
'SYY',
'HPQ',
'ADM',
'BAX',
'AEP',
'SRE',
'DD',
'LHX',
'TRV',
'MCK',
'GPN',
'MCHP',
'A',
'EXC',
'AZO',
'GIS',
'CDNS',
'DXCM',
'CARR',
'AFL',
'PH',
'APTV',
'ALGN',
'PSX',
'DLR',
'PAYX',
'EA',
'O',
'EBAY',
'SIVB',
'DFS',
'MSI',
'CTVA',
'STT',
'TT',
'YUM',
'WMB',
'VLO',
'STZ',
'PPG',
'ALL',
'XEL',
'WELL',
'OXY',
'AMP',
'NUE',
'WBA',
'IFF',
'ROST',
'TDG',
'RMD',
'FITB',
'SBAC',
'OTIS',
'MTCH',
'CBRE',
'AVB',
'TROW',
'KMI',
'CTAS',
'MTD',
'PCAR',
'PEG',
'DVN',
'GLW',
'BIIB',
'AJG',
'CMI',
'ROK',
'KR',
'WY',
'VRSK',
'KEYS',
'FRC',
'DLTR',
'EXPE',
'MNST',
'AME',
'BLL',
'FAST',
'TWTR',
'HSY',
'EQR',
'ANET',
'HAL',
'ED',
'WST',
'DAL',
'ANSS',
'ES',
'ALB',
'WEC',
'LUV',
'ODFL',
'OKE',
'WTW',
'TSN',
'DHI',
'CERN',
'CPRT',
'EFX',
'SWK',
'AWK',
'LYB',
'EPAM',
'ARE',
'NTRS',
'EXR',
'HES',
'LH',
'ZBH',
'CDW',
'LEN',
'BKR',
'TSCO',
'VMC',
'KEY',
'MKC',
'RSG',
'IT',
'KHC',
'SYF',
'HIG',
'RF',
'MLM',
'MAA',
'HBAN',
'CHD',
'MTB',
'FTV',
'CFG',
'URI',
'DOV',
'ZBRA',
'SWKS',
'BBY',
'PKI',
'STE',
'EIX',
'HPE',
'DTE',
'IR',
'STX',
'FE',
'VIAC',
'FANG',
'AEE',
'PPL',
'VRSN',
'ABC',
'SBNY',
'RJF',
'ULTA',
'ETR',
'ENPH',
'ESS',
'GWW',
'MPWR',
'VTR',
'NDAQ',
'DRE',
'NTAP',
'FLT',
'VFC',
'TDY',
'WAT',
'TTWO',
'COO',
'TYL',
'TER',
'DRI',
'RCL',
'PFG',
'ETSY',
'CTRA',
'OMC',
'VTRS',
'GPC',
'KMX',
'POOL',
'IP',
'EXPD',
'AMCR',
'CCL',
'CINF',
'AKAM',
'GRMN',
'CMS',
'HOLX',
'MGM',
'CZR',
'CE',
'CLX',
'GNRC',
'PEAK',
'TRMB',
'BR',
'WDC',
'BXP',
'CAG',
'CTLT',
'WAB',
'CNP',
'NLOK',
'NVR',
'MOS',
'EMN',
'PAYC',
'K',
'XYL',
'JBHT',
'UAL',
'MRO',
'J',
'TECH',
'DGX',
'DPZ',
'UDR',
'TXT',
'LVS',
'LYV',
'CRL',
'CEG',
'CF',
'BRO',
'FDS',
'CAH',
'TFX',
'AVY',
'FMC',
'QRVO',
'LKQ',
'SJM',
'BBWI',
'PWR',
'IEX',
'MKTX',
'MAS',
'KIM',
'AES',
'IPG',
'AAP',
'LNT',
'PKG',
'EVRG',
'FOXA',
'SEDG',
'ABMD',
'RHI',
'ATO',
'HWM',
'CMA',
'HRL',
'HST',
'BIO',
'CBOE',
'LNC',
'IRM',
'INCY',
'PHM',
'WHR',
'CTXS',
'WRB',
'WRK',
'L',
'JKHY',
'NDSN',
'FBHS',
'HAS',
'XRAY',
'AAL',
'BFB',
'FFIV',
'PTC',
'RE',
'APA',
'ZION',
'LDOS',
'CHRW',
'SNA',
'HSIC',
'TPR',
'JNPR',
'NI',
'BWA',
'ALLE',
'WYNN',
'UHS',
'REG',
'NWL',
'PNR',
'GL',
'AIZ',
'LW',
'CDAY',
'SEE',
'AOS',
'NRG',
'DXC',
'TAP',
'LUMN',
'NWSA',
'PBCT',
'CPB',
'OGN',
'DISCK',
'BEN',
'FRT',
'PENN',
'MHK',
'NCLH',
'IVZ',
'DISH',
'DVA',
'PNW',
'ALK',
'HII',
'PVH',
'ROL',
'VNO',
'NLSN',
'RL',
'FOX',
'IPGP',
'DISCA',
'UAA',
'UA',
'NWS'
]
    for ticker in tickers:

        stock_discussion1 = StockDiscussion(ticker=ticker)
        db.session.add(stock_discussion1)


    db.session.commit()

def undo_stock_discussions():
    db.session.execute('TRUNCATE stockDiscussions RESTART IDENTITY CASCADE;')
    db.session.commit()
