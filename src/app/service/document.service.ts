import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';
import * as constant from 'src/app/service/constants';

@Injectable()
export class DocumentService extends DataService{

  private documentData: any;
  services: any[] = [
    {
      name: 'Udyam Registration (Udhyod Aadhar)',
      description:'',
      image: "assets/images/document-doctor/aadhar-card.png",
      route:'/document-doctor/udhyog-aadhar',
      visibleTo: 'ALL'
    },
    {
      name: 'Food License Registration',
      description:'',
      image: 'assets/images/document-doctor/food-licience.png',
      route: '/document-doctor/food-licience',
      visibleTo: 'ALL'
    },
    {
      name: 'Shop Act (Gumsta) registration',
      description:'',
      image: 'assets/images/document-doctor/caste-validity.jpg',
      route: '/document-doctor/gumasta',
      visibleTo: 'ALL'
    },
    {
      name: 'GST',
      description:'',
      image: 'assets/images/document-doctor/caste-validity.jpg',
      route:'/document-doctor/gst',
      visibleTo: 'ALL'
    },
    {
      name: 'Digital Signature',
      description:'',
      image: 'assets/dsc/dsc-logo.jpg',
      route:'/document-doctor/dsc-application',
      visibleTo: 'ALL'
    },
    {
      name: 'ISO Registration',
      description:'',
      image: 'assets/iso/iso-logo.png',
      route:'/document-doctor/iso-registration',
      visibleTo: 'ALL'
    },
    {
      name: 'PF Registration',
      description:'',
      image: 'assets/pf/pf-logo.png',
      route:'/document-doctor/pf-registration',
      visibleTo: 'ALL'
    },
    {
      name: 'IEC Registration',
      description:'',
      image: 'assets/iec/iec-logo.jpg',
      route:'/document-doctor/iec-registration',
      visibleTo: 'ALL'
    },
    {
      name: 'PASSPORT SERVICE',
      description:'या सुविधे अंतर्गत ग्राहकांचे नविन पासपोर्ट साठी अर्ज भरणे, पासपोर्ट काढण्यासाठीचे शुल्क ऑनलाईन भरणे, पासपोर्ट इंटरव्ह्यू साठी अपॉईटमेंट घेणे, पोसपोर्ट अर्जाची सद्य स्थिती पाहणे, पासपोर्ट साठी पोलिस क्लिअरन्स सर्टिफिकेट काढणे इत्यादी कामे करू शकता.',
      image: 'assets/default.png',
      route:'https://portal2.passportindia.gov.in/AppOnlineProject/welcomeLink#',
      visibleTo: constant.VENDOR
    },
    {
      name: 'PAN CARD SERVICE',
      description:'सुविधेद्वारे तुम्ही ग्राहकांचे पॅनकार्ड काढणे, पॅनकार्ड मध्ये दुरुस्ती, हरवलेल्या पॅनकार्डची दुय्यम प्रत काढणे इ. कामे करू शकता.',
      image: 'assets/default.png',
      route:'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html',
      visibleTo: constant.VENDOR
    },
    {
      name: 'EPF SERVICES',
      description:'पीएफ सुविधे अंतर्गत तुम्ही ग्राहकांचा प्रोव्हिडंट फंड (कर्मचारी भविष्यनिर्वाह निधी) काढण्यासाठी क्लेम करणे, UNA नंबर काढणे. पीएफ पासबुक डाऊनलोड करणे. पीएफ मधील नाव जन्मतारीख इत्यादी माहिती अपडेट करणे इत्यादी कामे करू शकता.',
      image: 'assets/default.png',
      route:'https://www.epfindia.gov.in/',
      visibleTo: constant.VENDOR
    },
    {
      name: 'DRIVING LICENCE',
      description:'ड्रायव्हिंग लायसन्स सेवा अतंर्गत तुम्ही ड्रायव्हिंग लर्निंग लायसन्स साठी अर्ज भरणे, ड्रायव्हिंग लायसन्स साठी अर्ज भरणे, ड्रायव्हिंग चाचणीसाठी अपॉईटमेंट घेणे, ड्रायव्हिंग लायसन्स ची दुय्यम प्रत काढणे, ड्रायव्हिंग लायसन्स रिन्युअल करणे इत्यादी कामे करू शकता.',
      image: 'assets/default.png',
      route:'https://sarathi.parivahan.gov.in',
      visibleTo: constant.VENDOR
    },
    {
      name: 'शॉप ऍक्ट ( SHOP ACT)',
      description:'शॉप ऍक्ट ( Shop Act)सुविधे द्वारे तुम्ही तुमच्या भागातील दुकानदारांचे शॉप लायसन्स काही मिनिटांमध्ये त्वरित काढू शकता. तसेच जुने शॉप अ‍ॅक्ट लायसन्स चे रिन्युअल काढून देऊ शकता',
      image: 'assets/default.png',
      route:'lms.mahaonline.gov.in',
      visibleTo: constant.VENDOR
    },
    {
      name: 'POLICE CLEARANCE CERTIFICATE   (POLICE VERIFIACATION CERTIFICATE)',
      description:'सरकारी नोकरी, सैन्यदलातील भरती, पासपोर्ट विजा काढण्यासाठी लागणा-या पोलिस क्लिअरन्स साठी आपल्या भागातील उमेदवारांचे पोलिस क्लिअरन्स सर्टिफिकेट चे ऑनलाईन अर्ज भरून देऊ शकता.',
      image: 'assets/default.png',
      route:'https://pcs.mahaonline.gov.in/Forms/Home.aspx',
      visibleTo: constant.VENDOR
    },
    {
      name: 'भाडेकरार नोंदणी (LEAVE AND LICENSE AGREEMENT)',
      description:'भाडेकरार नोंदणी या सुविधेद्वारे आपल्या भागातील (शहरी) भाड्याने राहाणा-या नागरिकांचे ऑनलाईन भाडेकरार नोंदणी (LEAVE AND LICENSE AGREEMENT) करू शकता.',
      image: 'assets/default.png',
      route:'efilingigr.maharashtra.gov.in',
      visibleTo: constant.VENDOR
    },
    {
      name: 'दिव्यांग (अपंगत्वाचे) यूडीआयडी कार्ड व प्रमाणपत्रची DISABILITY UDID CARD & CERTIFICATE',
      description:'दिव्यांग यूडीआयडी कार्ड सुविधा द्वारे आपण आपल्या भागातील अपंग उमेदवारांचे युनिक डिसेबिलिटी आयडी सर्टिफिकेट साठी अर्ज करणे, यूडीआयडी कार्ड नुतनीकरण साठी अर्ज करणे इत्यादी कामे करू शकता.',
      image: 'assets/default.png',
      route:'http://www.swavlambancard.gov.in/pwd/application',
      visibleTo: constant.VENDOR
    },
    {
      name: 'नर्सिंग रजिस्ट्रेशन व रिन्युअलची (NURSING REGISTRATION & RENEWAL)',
      description:'नर्सिंग रजिस्ट्रेशन सुविधेद्वारे आपण आपल्या विभागातील परिचारीकांचे (नर्स) नर्सिंग कौन्सिलकडे नाव नोंदणी साठी ऑनलाईन करणे, तसेच त्याचे रिन्युअल साठी अर्ज भरणे या सारखी कामे करू शकता.',
      image: 'assets/default.png',
      route:'',
      visibleTo: constant.VENDOR
    },

    {
      name: 'अन्न आणि औषधे परवानाची (FOOD & DRUG PERMISSION)',
      description:'अन्न आणि औषधे परवाना सुविधेद्वारे तुम्ही आपल्या भागातील हॉटेल, स्विटमार्ट चालवण्याचा परवाना आणिक मेडिकल साठीच्या परवान्या साठी ऑनलाईन अर्ज भरून देऊ शकता.',
      image: 'assets/default.png',
      route:'http://fda.maharashtra.gov.in/',
      visibleTo: constant.VENDOR
    },
    {
      name: 'राजपत्र (GAZETTE)फेरबदलची ई सेवा',
      description:'या सुविधे अंतर्गत तुम्ही आपल्या भागातील ग्राहकांच्या नावातील बदलासाठी, जन्म तारखेतील बदलासाठी, तसेच धर्मात बदलासाठी ऑनलाईन अर्ज करू शकता.',
      image: 'assets/default.png',
      route:'https://dgps.maharashtra.gov.in/1035/Home',
      visibleTo: constant.VENDOR
    },
    {
      name: 'आधार पॅन लिंकिंग',
      description:'',
      image: 'assets/default.png',
      route:'https://www1.incometaxindiaefiling.gov.in/e-FilingGS/Services/LinkAadhaarHome.html?lang=eng',
      visibleTo: constant.VENDOR
    },
    {
      name: 'PVT LTD COMPANY REGISTRATION',
      description:'',
      image: 'https://www.onlinelegalindia.com/images/home/Corporate-Related-Services-OLI.jpg',
      route:'/document-doctor/private-company-registration',
      visibleTo: 'ALL'
    },
    {
      name: 'LIMITED LIABILITY PARTNERSHEEP',
      description:'',
      image: 'https://www.onlinelegalindia.com/services/llp-partnership/image/llp-home-banner.jpg',
      route:'/document-doctor/limitted-liability-partnersheep',
      visibleTo: 'ALL'
    },
    {
      name: 'ONE PERSON COMPANY',
      description:'',
      image: 'https://www.onlinelegalindia.com/services/one-person-company-registration/image/one-person-company-banner.jpg',
      route:'/document-doctor/one-person-company',
      visibleTo: 'ALL'
    },
    {
      name: 'NIDHI COMPANY REGISTRATION',
      description:'',
      image: 'https://www.onlinelegalindia.com/services/nidhi-company/image/nidhi-banner.jpg',
      route:'/document-doctor/nidhi-company-registration',
      visibleTo: 'ALL'
    },
    {
      name: 'TRADE MARK REGISTRATION',
      description:'',
      image: 'https://www.onlinelegalindia.com/services/trademark-registration/image/trademark-banner.png',
      route:'/document-doctor/trademark-registration',
      visibleTo: 'ALL'
    },
    {
      name: 'INCOME TAX RETURN',
      description:'',
      image: 'https://www.onlinelegalindia.com/images/home/income-tax.jpg',
      route:'/document-doctor/incometax-return',
      visibleTo: 'ALL'
    },
    {
      name: 'PARTNERSHEEP DEED (NOTARY)',
      description:'',
      image: 'https://cdn1.byjus.com/wp-content/uploads/2019/07/Partnership-deed.png',
      route:'/document-doctor/patnersheep-deed-notary',
      visibleTo: 'ALL'
    },
    {
      name: 'PARTNERSHEEP DEED (REGISTERED)',
      description:'',
      image: 'https://cdn1.byjus.com/wp-content/uploads/2019/07/Partnership-deed.png',
      route:'/document-doctor/patnersheep-deed-registered',
      visibleTo: 'ALL'
    },
    {
      name: 'RENT AGREEMENT (NOTARY)',
      description:'',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIzobInkKOmyLTWtugS7IVNXeGsPtFIGtgwg&usqp=CAU',
      route:'/document-doctor/rent-agreement-notary',
      visibleTo: 'ALL'
    },
    {
      name: 'RENT AGREEMENT (REGISTERED)',
      description:'',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIzobInkKOmyLTWtugS7IVNXeGsPtFIGtgwg&usqp=CAU',
      route:'/document-doctor/rent-agreement-registered',
      visibleTo: 'ALL'
    },
  ];

  get document() {
    return this.documentData;
  }

  set document(data) {
    this.documentData = data;
  }

  saveGezetteDocument(data) {
    return this.postData(`${environment.base_url}/v1/gezeette-add`, data)
  }

  saveAdharCardDocument(data){
    // const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
    // return this.postData(`${environment.base_url}/v1/aadhar-add`, data,
    // {headers:headers} );
    return this.postData(`${environment.base_url}/v1/aadhar-add`, data);
  }
  saveFoodLicience(data){
    return this.postData(`${environment.base_url}/v1/food-licience-add`, data);
  }
  savePrivateCompanyRegistration(data){
    return this.postData(`${environment.base_url}/v1/priavet-company-registration-add`, data);
  }

  saveUdhyogAadharDocument(data){
    return this.postData(`${environment.base_url}/v1/udyog-adhar-add`, data)
  }
  saveGumasta(data){
    // const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
    // return this.postData(`${environment.base_url}/v1/gumasta-add`, data,
    // {headers:headers} );
    return this.postData(`${environment.base_url}/v1/gumasta-add`, data)
  }
  saveGst(data){
    // const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
    // return this.postData(`${environment.base_url}/v1/gumasta-add`, data,
    // {headers:headers} );
    return this.postData(`${environment.base_url}/v1/gst-add`, data)
  }

  savePoliceVerificationDocument(data){
    return this.postData(`${environment.base_url}/v1/police-verification-add`, data)
  }

  addUser(user){
    return this.postData(`${environment.base_url}/v1/addUser`, user)
  }

  saveUserProfile(data){
    return this.postData(`${environment.base_url}/v1/updateUser`, data)
  }
  saveBlog(data){
    return this.postData(`${environment.base_url}/v1/blog`, data)
  }

  getRequstedDouments(user_id){
    return this.getData(`${environment.base_url}/v1/suggested-documents/${user_id}`)
  }

  savePfDocument(data){
    return this.postData(`${environment.base_url}/v1/pf`, data)
  }

  saveISODocument(data){
    return this.postData(`${environment.base_url}/v1/iso`, data)
  }

  saveIESDocument(data){
    return this.postData(`${environment.base_url}/v1/ies`, data)
  }

  saveDSCDocument(data){
    return this.postData(`${environment.base_url}/v1/dsc`, data)
  }
}
