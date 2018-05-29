function wpcf7_dynamic_email($recipient, $args=array()) {
  if (isset($args['first_as_label'])) {
    if ($args['first_as_label'] == 'Denver - USA') {
      $recipient = 'michelle@miracle.org';
    } elseif ($args['first_as_label'] == 'Munich - Europe') {
      $recipient = 'karin.theisen@web.de';
    } elseif ($args['first_as_label'] == 'Latin America') {
      $recipient = 'rosa@miracle.org';
    } elseif ($args['first_as_label'] == 'Perth - Australia') {
      $recipient = 'gmpperth@gmail.com';
    } elseif ($args['first_as_label'] == 'tester') {
      $recipient = 'will@agencyzero.com';
    }
  }
  return $recipient;
} // end function wpcf7_dynamic_to_filter_example
add_filter('wpcf7-dynamic-email', 'wpcf7_dynamic_email', 10, 2);
