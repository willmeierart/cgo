/* eslint-disable */

var _____offerings_____ = {
  locations: [
    {
      id : int.primary.isRequired,
      title : str.isOptional, // will be 'Center of the Golden One' if not specified
      menu_slug : str.isRequired,
      address : str.isRequired,
      phone : str.isOptional
    }
  ],
  events: {
    introductory: [
      {
        location_id : int.primary.isRequired,
        type : str.isRequired = 'expanding_awareness' || 'introduction_to_the_seminar' || 'public_meditation',
        title : str.isOptional, // will be 'type' if not specified
        recurring : bool.isOptional, // i.e. 'every wednesda y'. if not specified, 'date' is required
        date : str.isRequired, // normalized format - i.e. '7:00pm - 9:00pm MT' if not specified, 'recurring_date' is required
        time : str.isRequired,
        time_notes : str.isOptional, // i.e. 'please arrive by 6:45 pm'
        price : str.isRequired, // 'free' if free
        price_notes : str.isOptional, // i.e. 'first time free'
        other_notes : str.isOptional, // char_limit - let's start with 200, subject to change. if not specified, some boilerplate will be used
        portal_link : str.isRequired,
        streaming_link : str.isOptional
      }
    ],
    meditation: [
      {
        location_id : int.primary.isRequired,
        type : str.isRequired = 'public_meditation' || 'gmp_workshop_(1_day)' || 'meditation_course' || 'freedom_walk_meditation' || 'path_meditation',
        title: str.isOptional, // will be 'type' if not specified
        recurring : bool.isOptional, // i.e. 'every wednesday'. if not specified, 'date' is required
        date : str.isRequired, // normalized format - i.e. '7:00pm - 9:00pm MT' if not specified, 'recurring_date' is required
        time : str.isRequired,
        time_notes : str.isOptional, // i.e. 'please arrive by 6:45 pm'
        price : str.isRequired, // 'free' if free
        price_notes : str.isOptional, // i.e. 'first time free'
        other_notes : str.isOptional, // char_limit - let's start with 200, subject to change. if not specified, some boilerplate will be used
        portal_link : str.isRequired,
        streaming_link : str.isOptional
      }
    ],
    seminars: [
      {
        location_id : int.primary.isRequired,
        type : str.isRequired = '1_day_seminar' || '4_day_intensive' || '30_day_seminar' || 'advanced_intensive',
        title: str.isOptional, // will be 'type' if not specified
        recurring : bool.isOptional, // i.e. 'every wednesday'. if not specified, 'date' is required
        date : str.isRequired, // normalized format - i.e. '7:00pm - 9:00pm MT' if not specified, 'recurring_date' is required
        time : str.isRequired,
        time_notes : str.isOptional, // i.e. 'please arrive by 6:45 pm'
        price: str.isRequired, // 'free' if free
        price_notes : str.isOptional, // i.e. 'first time free'
        other_notes : str.isOptional, // char_limit - let's start with 200, subject to change. if not specified, some boilerplate will be used
        portal_link : str.isRequired,
        streaming_link : str.isOptional
      }
    ]
  }
}
