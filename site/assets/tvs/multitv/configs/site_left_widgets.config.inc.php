<?php
$settings['display'] = 'vertical';
$settings['fields'] = array(
	'title' => array(
		'caption' => 'Заголовок (не обязательно)',
		'type' => 'text'
	),
	"message" => array(
		'caption' => 'Код',
		'type' => 'textarea'// richtext, textarea
	),
	'css' => array(
		'caption' => 'CSS классы для виджета (разделитель пробел)',
		'type' => 'tex'
	),
);
$settings['templates'] = array(
	'outerTpl' => '[+wrapper+]',
	'rowTpl' => '<div class="bvi-no-styles widget[+css:ne=``:then=` [+css+]`+]"><article class="widget-article">[+title:ne=``:then=`<header class="widget-article-header"><h5 class="widget-article-title">[+title+]</h5></header>`+]<div class="widget-article-content">[+message+]</div></article></div>'
);
$settings['configuration'] = array(
	'enablePaste' => true,
	'csvseparator' => ';'
);