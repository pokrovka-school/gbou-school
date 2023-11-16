<?php
return [
	'caption'  => 'Слайдер, сайты, новости',
	'introtext' => 'Слайдер, сайты, новости',
	'settings' => [
		'site_photogallery_show' => [
			'caption' => 'Показывать карусель на других страницах',
			'type'  => 'dropdown',
			'elements' => 'Показывать==1||Не показывать==0',
			'note' => 'Показывать карусель на других страницах сайта или только на «Главной» странице сайта',
			'default_text' => '0'
		],
		'site_gosuslugi_show' => [
			'caption' => 'Показывать банер ГОСУСЛУГ на других страницах',
			'type'  => 'dropdown',
			'elements' => 'Показывать==1||Не показывать==0',
			'note' => 'ППоказывать банер ГОСУСЛУГ на других страницах сайта или только на «Главной» странице сайта',
			'default_text' => '0'
		],
		'news_count_home' => [
			'caption' => 'Количество перевью новостей на странице <strong>«Главная»</strong>',
			'type'  => 'number',
			'note' => '',
			'default_text' => '5'
		],
		'news_count_news' => [
			'caption' => 'Количество перевью новостей на странице <strong>«Новости»</strong>',
			'type'  => 'number',
			'note' => '',
			'default_text' => '5'
		],
		'site_photogallery' => [
			'caption' => 'Карусель станицы',
			'type'  => 'custom_tv:multitv',
		],
		'site_links' => [
			'caption' => 'Сайты',
			'type'  => 'custom_tv:multitv',
		],
	]
];