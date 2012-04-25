<?php
/**
 * @file
 * Adminstrative page callbacks for Social River
 *
 * @ingroup Social River
 */

/**
 * Implementation of Social River settings form.
 */
function social_river_settings_form() {
  $service_list = social_river_services();

  $form['social_river'] = array(
    '#type' => 'fieldset',
    '#title' => t('Configure Social River'),
  );

  $form['social_river']['social_river_feed_limit'] = array(
    '#type' => 'textfield',
    '#title' => t('Feed limit'),
    '#default_value' => variable_get('social_river_feed_limit', 10),
  );

  $form['social_river']['services'] = array(
    '#type' => 'fieldset',
    '#title' => t('Enable services'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );

  $services = array();
  foreach ($service_list as $service => $data) {
    $services[$service] = $data['title'];
  }
  $form['social_river']['services']['social_river_services_enabled'] = array(
    '#type' => 'checkboxes',
    '#title' => t('Available services'),
    '#default_value' => variable_get('social_river_services_enabled', $services),
    '#options' => $services,
  );

  return system_settings_form($form);
}
