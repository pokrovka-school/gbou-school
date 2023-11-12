<?php
$settings['display'] = 'vertical';
$settings['fields'] = array(
	'title' => array(
		'caption' => 'Заголовок',
		'type' => 'text'
	),
	'image' => array(
		'caption' => 'Изображение',
		'type' => 'image'
	),
	'thumb' => array(
		'caption' => 'Перевьюшка',
		'type' => 'thumb',
		'thumbof' => 'image'
	)
);
$settings['templates'] = array(
	'outerTpl' => '<div class="row"><div class="clearfix photogallery">[+wrapper+]</div></div>',
	'rowTpl' => '<div class="photogallery-item"><div class="column photogallery-item-image"><a href="[(site_url)][+image+]" data-fancybox-group="photogallery" data-fancybox="ptogallery" data-caption="[[strHsc? &input=`[+title+]`]]" data-loop="true" title="[[strHsc? &input=`[+title+]`]]"><img src="[[thumb? &input=`[+image+]` &options=`w=375,h=240,zc=C`]]" alt="[[strHsc? &input=`[+title+]`]]"></a></div></div>'
);
$settings['configuration'] = array(
	'enablePaste' => true,
	'csvseparator' => ';'
);