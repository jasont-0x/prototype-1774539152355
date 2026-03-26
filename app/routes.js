const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/travel-date', function (req, res) {
  res.render('travel-date')
})

router.post('/travel-date', function (req, res) {
  const answer = req.session.data['travel-date']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'travel-date': 'Enter when you need to travel.' }
    return res.render('travel-date')
  }
  res.redirect('/urgency-details')
})

router.get('/urgency-details', function (req, res) {
  res.render('urgency-details')
})

router.post('/urgency-details', function (req, res) {
  const answer = req.session.data['urgency-details']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'urgency-details': 'Tell us why you need your passport urgently.' }
    return res.render('urgency-details')
  }
  res.redirect('/current-passport')
})

router.get('/current-passport', function (req, res) {
  res.render('current-passport')
})

router.post('/current-passport', function (req, res) {
  const answer = req.session.data['current-passport']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'current-passport': 'Select whether you have your current passport.' }
    return res.render('current-passport')
  }
  if (answer === 'yes') {
    return res.redirect('/appointment-location')
  } else if (answer === 'no') {
    return res.redirect('/ineligible-current-passport')
  } else if (answer === 'lost-stolen') {
    return res.redirect('/ineligible-current-passport')
  }
  res.redirect('/appointment-location')
})

router.get('/ineligible-current-passport', function (req, res) {
  res.render('ineligible-current-passport')
})

router.get('/appointment-location', function (req, res) {
  res.render('appointment-location')
})

router.post('/appointment-location', function (req, res) {
  const answer = req.session.data['appointment-location']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'appointment-location': 'Select which passport office location works best for you.' }
    return res.render('appointment-location')
  }
  if (answer === 'london') {
    return res.redirect('/contact-method')
  } else if (answer === 'manchester') {
    return res.redirect('/contact-method')
  } else if (answer === 'glasgow') {
    return res.redirect('/contact-method')
  } else if (answer === 'belfast') {
    return res.redirect('/contact-method')
  } else if (answer === 'cardiff') {
    return res.redirect('/contact-method')
  }
  res.redirect('/contact-method')
})

router.get('/contact-method', function (req, res) {
  res.render('contact-method')
})

router.post('/contact-method', function (req, res) {
  const answer = req.session.data['contact-method']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'contact-method': 'Select how you would like us to contact you.' }
    return res.render('contact-method')
  }
  if (answer === 'phone') {
    return res.redirect('/check-answers')
  } else if (answer === 'text') {
    return res.redirect('/check-answers')
  } else if (answer === 'email') {
    return res.redirect('/check-answers')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('URP')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
