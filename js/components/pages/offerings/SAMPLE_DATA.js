import moment from 'moment'
export const SAMPLE_DATA = {
  locations: [
    {
      place_id: 2352345,
      menu_slug: 'denver',
      title: 'Center of the Golden One', // will be 'Center of the Golden One' if not specified
      address: '1234 fakefake st, Denver, CO',
      phone: '(696) 969-6969'
    },
    {
      place_id: 2352346,
      menu_slug: 'boulder',
      title: 'Center of the Golden One', // will be 'Center of the Golden One' if not specified
      address: '1234 fakefake st, Boulder, CO',
      phone: '(456) 969-4569'
    },
    {
      place_id: 2352347,
      menu_slug: 'buenos_aires',
      title: 'Center of the Golden One', // will be 'Center of the Golden One' if not specified
      address: '1234 fakefake st,  Buenos Aires',
      phone: '(456) 969-4569'
    },
    {
      place_id: 2352348,
      menu_slug: 'san_jose',
      title: 'Center of the Golden One', // will be 'Center of the Golden One' if not specified
      address: '1234 fakefake st, San Jose, CR',
      phone: '(456) 969-4569'
    },
    {
      place_id: 2352349,
      menu_slug: 'perth',
      title: 'Center of the Golden One', // will be 'Center of the Golden One' if not specified
      address: '1234 fakefake st, Perth, CO',
      phone: '(456) 969-4569'
    }
  ],
  events: {
    meditation: [
      {
        id: 2324,
        location_id: 2352345,
        type: 'public_meditation',
        recurring: 'Every Wednesday', // i.e. 'every wednesday'. if not specified, 'date' is required
        date: `${moment(new Date()).format('MMMM D, YYYY')}`, // normalized format - i.e. '7:00pm - 9:00pm MT' if not specified, 'recurring_date' is required
        time: '7:00 - 8:00 PM MT',
        time_notes: 'please arrive days before', // i.e. 'please arrive by 6:45 pm'
        price: '$500', // 'free' if free
        price_notes: "just kidding, it's free", // i.e. 'first time free'
        other_notes: 'come around back to the alley and behind the second dumpster theres a secret entrance', // char_limit - let's start with 200, subject to change. if not specified, some boilerplate will be used
        portal_link: 'http://sdfsdfsd.rr/ff',
        streaming_link: 'youtube.jf/ssasdfasdf'
      },
      {
        id: 67567,
        location_id: 2352345,
        type: 'path_meditation',
        date: `${moment(new Date()).add(78, 'd').format('MMMM D, YYYY')}`, // normalized format - i.e. '7:00pm - 9:00pm MT' if not specified, 'recurring_date' is required
        time: '7:00 - 8:00 PM MT',
        time_notes: 'asdfasdfasdf', // i.e. 'please arrive by 6:45 pm'
        price: '$500', // 'free' if free
        price_notes: "ahhhhhhh", // i.e. 'first time free'
        other_notes: 'sdffffffffffffret entrance ..sd .', // char_limit - let's start with 200, subject to change. if not specified, some boilerplate will be used
        portal_link: 'http://sdfsdfsd.rr/ff',
        streaming_link: 'youtube.jf/ssasdfasdf'
      },
      {
        id: 645673,
        location_id: 2352348,
        type: 'path_meditation',
        date: `${moment(new Date()).add(7, 'd').format('MMMM D, YYYY')}`, // normalized format - i.e. '7:00pm - 9:00pm MT' if not specified, 'recurring_date' is required
        time: '7:00 - 8:00 PM MT',
        time_notes: 'recur1', // i.e. 'please arrive by 6:45 pm'
        price: '$5', // 'free' if free
        price_notes: "reeecur", // i.e. 'first time free'
        other_notes: 'we recur', // char_limit - let's start with 200, subject to change. if not specified, some boilerplate will be used
        portal_link: 'http://sdfsdfsd.rr/ff',
        streaming_link: 'youtube.jf/ssasdfasdf'
      },
      {
        id: 3458345083450,
        location_id: 2352348,
        type: 'path_meditation',
        recurring: 'Every Wednesday', // i.e. 'every wednesday'. if not specified, 'date' is required
        date: `${moment(new Date()).add(14, 'd').format('MMMM D, YYYY')}`, // normalized format - i.e. '7:00pm - 9:00pm MT' if not specified, 'recurring_date' is required
        time: '7:00 - 8:00 PM MT',
        time_notes: 'recur2', // i.e. 'please arrive by 6:45 pm'
        price: '$5', // 'free' if free
        price_notes: "ahhhhhhh", // i.e. 'first time free'
        other_notes: 'and recur and recur .', // char_limit - let's start with 200, subject to change. if not specified, some boilerplate will be used
        portal_link: 'http://sdfsdfsd.rr/ff',
        streaming_link: 'youtube.jf/ssasdfasdf'
      }
    ],
    introductory: [],
    seminars: []
  }
}

export const meditationTypes = ['Public Meditation', 'GMP Workshop (1 day)', 'Meditation Course (5 weeks)', 'Freedom Walk Meditation', 'Path Meditation']
export const introductoryTypes = ['Expanding Awareness', 'Introduction to the Seminar', 'Public Meditation']
export const seminarTypes = ['1 Day Seminar', '4 Day Intensive', '30 Day Seminar', 'Advanced Intensive']
