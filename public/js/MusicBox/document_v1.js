'use strict';
/*
 ____________________
|*      * *    * *  *|
|*      M *    M    M|
|       * u    *    *|
|      s  *       s *|
|         *    i     |
|   c   * c    *    *|
| B   *   *         *|
| *    o  o         *|
|     *   x         *| 
|*||||*||||||||||||*||
|||||||||v.1||||||||||  
||o                o||      
||  Boite à musique ||______|
||o  ~ MusicBox    o||______| 
||||||||||||||||||||||  


Welcome here ! 
*/

// TODO
// doc_options
// "virtual" collections cf $scope.virtualize



// ** GLOBAL MISC VARS
var inheriting = {};
var GLOBALS;
var render;
var doc;


 /**
 * Represents a document.
 * @class DocumentCtrl
 * @param {Object} $scope - angular service
 * @param {Object} $http -  angular service
 * @param {Object} $location -  angular service
 * @param {Object} $routeParams -  angular service
 * @param {Factory} renderfactory -  angular custom factory for render
  * @param {Factory} docfactory -  angular custom factory for document 

 */


var newdoc_service;

function DocumentNewCtrl($scope, $http , docfactory) {
console.log('DocumentNewCtrl')



	

	$scope.init_ = function (){
       	 	$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

		
			 newdoc_service =  docfactory();
			 newdoc_service.init_new();

			//alert('A')
	}
	


	$scope.create_doc = function(){
		//alert('B')
		console.log($scope.newdoc)
				

		 newdoc_service.newdoc();
	}

	$scope.init_()
	//alert('0')

}


function DocumentCtrl($scope, $http , $sce, $location, $routeParams, renderfactory,socket,docfactory) {
		
		console.log('DocumentCtrl on');

		socket.on('news', function (data) {
			console.log(data);
		})
		socket.on('newsback', function (data) {
			console.log('newsback')
			console.log(data);
		})

		/**
		* init a document.
	    * @function DocumentCtrl#init
		*/
		$scope.init = function (){
			console.log('DocumentCtrl init');

		
			render = renderfactory();
			$scope.render = render.init();
			doc =  docfactory();
			doc.init();
			
		}


// util flatten array to string
var flatten= function (n) {
		//console.log(n);
		var out = '';
			_.each(n, function(c, i){out +=  n[i]+' ';});
		return out;
}	




	/**
	* construct virtual collection	
	*  use case : summarization
	*  @params collection_name (header, name , auto{}, implicit{}, explicit{})
	*  @return text string
	*  A. auto : use h1>h6
	*  B  implicit : subtype using corresponding ranges of text (implicit)
	*  C  explicit : subtype collection . > using markup metavalue (explicit)

	*/ 
$scope.virtualize = function(collection){
	//	doc.virtualize(collection)
}



$scope.switch_editing = function (origin){

/*
console.log($scope.inserttext[origin.sectionin])
console.log(origin)

console.log('editing in section'+ origin.sectionin)
console.log('editing from'+ origin.rindex)

var left_text = ''
var right_text = ''

for (var i = 0; i <  origin.rindex; i++) {
	left_text += $scope.doc.content[i]
}
for(var i = origin.rindex; i <  $scope.doc.content.length; i++){
	right_text  += $scope.doc.content[i]
}
$scope.doc.content = left_text+' '+ $scope.inserttext[origin.sectionin] +' '+right_text
// reindex markups



$scope.$emit('docEvent', {action: 'fulltext', type: 'edit', collection_type: 'document', collection:$scope.doc});
*/

}

	$scope.over= function(letter, event){
		
		var down_at;
		var up_at;
		down_at  = $scope.ui.selected_range.start
		up_at	 = $scope.ui.selected_range.end


		console.log(event)

		//console.log(letter)


		var event_at = letter.order;
		

		if(event == 'down'){
			down_at = event_at;

			if(down_at < $scope.ui.selected_range.end){
				$scope.ui.selected_range.start = down_at
			}
			else{
				$scope.ui.selected_range.start = down_at
			}

		}
		if(event == 'up'){
			var up_at =  event_at;
			$scope.ui.selected_range.end = up_at
		}
		if(event == 'click'){
			
			$scope.ui.selected_range.end = letter.order;
			$scope.ui.selected_range.start = letter.order;


			console.log(letter)

		}

		
		$scope.ui.selected_range.textrange = doc.text_range($scope.ui.selected_range.start, $scope.ui.selected_range.end)   


		

///



		if(event == 'click'){
			if(letter.href !==''){
				//console.log(letter)
				//alert(letter.href)
				window.location = letter.href
			}
		}


		//if(event_at <= $scope.ui.selected_range.start){
		//	$scope.ui.selected_range.start = event_at;
		//}
		//else{
			//$scope.ui.selected_range.start =  event_at;
		//}

		//if(event_at > $scope.ui.selected_range.end){
		//	$scope.ui.selected_range.end= event_at;
		//}
		//else{
			//$scope.ui.selected_range.start =  event_at;
		//}
		//console.log(letter)
		//$scope.ui.selected_range.start  = letter.rindex
		//$scope.ui.selected_range.end = letter.rindex




	}
	

	$scope.edit_doc = function(field){

		if(field == 'content'){
			//alert('content change without api offset!')
		}	
		if($scope.userin.username ==''){
			return false;
		}


			if($scope.ui['editing_'+field] === true){
				$scope.ui['editing_'+field] = false;
				doc.save_doc(field)
			}
			else{
				$scope.ui['editing_'+field]= true;
			}
	}

	$scope.edit_doc_option = function(field){
		if($scope.userin.username ==''){
			return false;
		}
		if($scope.ui['editing_'+field] === true){
				$scope.ui['editing_'+field] = false;
				doc.save_doc_option(field)
				//alert($scope.doc_options[field].value)
			}
			else{
				$scope.ui['editing_'+field]= true;
			}

				
	}




	$scope.newDm = function (){
		doc.create_doc_option();
	}
	$scope.deleteDm = function (opt_name){	
		doc.delete_doc_option(opt_name);
	}
	// save to api 
	$scope.saveDm = function (opt_name){
		doc.save_doc_option(opt_name);
	}


	$scope.toggle_select_markup = function (markup, event_name){
		if(!event_name){
			var event_name = 'click'
		}



		var real_start = markup.start 	- $scope.containers[markup.sectionin].start 
		var real_end   = markup.end 	- $scope.containers[markup.sectionin].start


		

		if(markup.selected===true && event_name == 'click'){
			markup.selected = false
		}
		else if(markup.selected===false && event_name == 'click'){
			markup.selected =true
		}
		
		// cant edit if not a 'by_me' markup
		if( ($scope.doc_owner == true  ||  $scope.ui.secret ||  markup.by_me == 'true') && markup.editing===true && event_name == 'dblclick'){
			markup.editing = false
		}
		else if( ($scope.doc_owner == true  ||  $scope.ui.secret ||  markup.by_me == 'true')  && markup.editing===false && event_name == 'dblclick'){
			markup.editing = true
		}
		console.log(markup)


		$scope.ui.selected_range.start = real_start
		$scope.ui.selected_range.end 	= real_end
		$scope.ui.selected_section_index = markup.sectionin




		if(markup.editing == true){
			$scope.ui.editing_objects.push(markup)
		}
		if(markup.editing == false){
			$scope.ui.editing_objects = _.without($scope.ui.editing_objects, markup)
		}

		if(markup.selected == true){
			$scope.ui.selected_objects.push(markup)
			$scope.$emit('docEvent', {action: 'selection', type: 'select' });
		}
		if(markup.selected == false){
			$scope.ui.selected_objects = _.without($scope.ui.selected_objects, markup)
			$scope.$emit('docEvent', {action: 'selection', type: 'unselect' });
		}




	}
	
	$scope.open_comment_push = function (container_index){
	// this way only one menu can me open.. and persistent
		var cur = $scope.ui.menus.push_comment.open;
		if(cur == container_index.sectionin){
			cur = -1	
		}
		else{
			cur = container_index.sectionin;
		}
		$scope.ui.menus.push_comment.open = cur;
		return;
	}

    $scope.push = new Object;
	$scope.push_section= function (){
		$scope.push.type = 'container';
		$scope.push.subtype = 'container';
		$scope.push.start =100;
		$scope.push.position = 'inline';
		$scope.push.end = 200;
		$scope.push_markup();

	}
	$scope.push_generic_from_ranges= function (type, subtype,position){

				$scope.push.type = type;
				$scope.push.subtype = subtype;
				$scope.push.start= $scope.ui.selected_range.start;
				$scope.push.end = $scope.ui.selected_range.end;
				$scope.push.position = position

				$scope.push_markup();



	}

	// change and save a single value of a markup
	$scope.replace_markup = function(markup, field, value){
		markup[field] = value;
		doc.markup_save(markup)
	}


	$scope.push_comment= function (){
		$scope.push.type = 'comment';
		$scope.push.subtype = 'comment';



// sectionIN.start
		$scope.push.start= 0;
		$scope.push.end = 1;
		
		$scope.push.position = 'left';

		$scope.push_markup();

		// close form.
		$scope.ui.menus.push_comment.open  = -1

	}


	$scope.push_markup = function (){
			console.log($scope.push)
		// clean up object
			if(!$scope.push.depth){
				$scope.push.depth = 1;
			}
			if(!$scope.push.start){
				$scope.push.start = 0;
			}
			if(!$scope.push.end){
				$scope.push.end = 1;
			}
			if(!$scope.push.type){
				$scope.push.type = 'markup';
			}
			if(!$scope.push.metadata){
				$scope.push.metadata= '-';
			}
			if(!$scope.push.status){
				$scope.push.status= '-';
			}
			if(!$scope.push.subtype){
				$scope.push.subtype = 'h1';
			}
            if(!$scope.push.position){
				$scope.push.position = 'inline';
			}
			if(!$scope.push.doc_id_id){
				$scope.push.doc_id_id = 'null';
			}


			

		//call service
		doc.push_markup($scope.push)

		

	}
	$scope.offset_markups = function (){
		doc.offset_markups()
	}
	
	$scope.offset_markup = function (markup, start_qty, end_qty){
		doc.offset_markup(markup, start_qty, end_qty)
	}


	$scope.markup_save = function (markup){
		doc.markup_save(markup)
	}


	// open tools for markup or section 
	$scope.object_tools = function (object){
		if(object.object_tools && object.object_tools === true){
			return object.object_tools = false;
		}
			return object.object_tools = true;
	}

	/**
	* delete a markup on click
	* @function DocumentCtrl#delete_markup
	* @param  {Object} markup - markup to delete
	*/
	$scope.markup_delete = function (markup){
		 if(markup.type=="container"){
			 //alert('can hold objects!')
			 //return;
			 if($scope.sectionstocount == 1){
			 	alert('can\'t delete last section')
			 	return
			 }
			 doc.markup_delete(markup)
		 }
		else{
			doc.markup_delete(markup)
		}
	}

	/**
	* turn links clickable out of angular routing
	* @function DocumentCtrl#external_link
	* @param  {String} link - redirect link
	*/
	$scope.external_link = function (link){
		window.location = link;
	}

	$scope.expand_tools = function(name){

		//$scope.ui.menus[name].open = $scope.ui.menus[name].open * -1;
		if($scope.ui.menus[name].open == 'no'){
			$scope.ui.menus[name].open = 'yes'
		}
		else{
			$scope.ui.menus[name].open = "no"
		}
		//return;
		//alert('d')
	}

	$scope.toggle_render = function(r){
		$scope.ui.menus['quick_tools'].open = "no"
		$scope.ui.renderAvailable_active = r
	}
	
	$scope.upload_file_image = new Object({'uploaded': false});
	$scope.preuploadFile = function(files){
		$scope.upload_file_image.file = files[0];
		return;
	}


	$scope.uploadFile = function(){
		
		
		var fd = new FormData();
		fd.append("image", $scope.upload_file_image.file);


		
		$http.post(api_url+'/media/upload', fd, 
			{ 
				withCredentials: true,
        		headers: {'Content-Type': undefined },
        		transformRequest: angular.identity 
        	
        	}
        	).success(function(m) {
				$scope.upload_file_image.uploaded = true;
        		$scope.upload_file_image.basename = m[0].basename
				$scope.upload_file_image.path = m[0].path
				$scope.upload_file_image.type = m[0].type
				$scope.upload_file_image.fullpath = root_url+'/uploads/'+m[0].path+m[0].basename


				$scope.push.metadata = $scope.upload_file_image.fullpath


			}).error(function(err){
				console.log(err)
		})


	}



	/**
	*  EVENTS 
	* 
	* Get broadcasted events
	* @function DocumentCtrl#events
	*/

	$scope.$on('doc', function(event, args) {
		if(args.action){
			console.log('EVENT logger '+args.action)
			

			if(args.action == 'reload'){
				//alert('d')
			}

			if(args.action == 'fulltext'){
				doc.init_containers()
			}
			if(args.action == 'selection'){

					// NOT STABLE
					// loop each  $scope.ui.selected_objects.

					for (var i = $scope.ui.selected_range.start; i < $scope.ui.selected_range.end; i++) {
						if(args.type == 'select'){
							$scope.letters[$scope.ui.selected_section_index][i]['classes'].push('selected');
						}
						if(args.type == 'unselect'){
							$scope.letters[$scope.ui.selected_section_index][i]['classes'] = _.without($scope.letters[$scope.ui.selected_section_index][i]['classes'], 'selected')
						}

					}
					socket.emit('news', {doc_id: $scope.doc.title, action: args.action , type: args.type });
					console.log($scope.ui);


			}
			if(args.action == 'doc_ready'){	
				doc.init_containers()
				if(args.type !== 'load'){
				//	socket.emit('news', {doc_id: $scope.doc.title, action: args.type, collection_type: args.collection_type, collection: args.collection });
				}
			}
			if(args.action == 'containers_ready'){
				doc.distribute_markups()
			}
			if(args.action == 'dispatched_objects'){
				$scope.ui.loaded = 'loaded'


			}

			


		}

	});

$scope.init()

//alert(API_SERVER_URL)
} // CTRL

/** 
* list all socketed events
* @class SocketsListCtrl
**/
function SocketsListCtrl($scope, $http , $location, $routeParams, socket) {
		//$scope.docs = DOCS;
		console.log('SocketsListCtrl')
		$scope.stack = [];
		socket.on('newsback', function (data) {
			//console.log('newsback')
			//console.log(data);
			$scope.stack.push(data)
		})
		$scope.delete_markup = function (markup,doc_id){
		
		 $http.get(root_url+'/api/v1/doc/'+doc_id+'/markups/delete/'+markup._id).success(function(m) {
			//console.log(m)
			alert('job done')
			//$scope.doc = m;
			//$scope.$emit('docEvent', {action: 'doc_ready' });
		 })
		}
}
/** 
* @class DocumentsListCtrl
**/
function DocumentsListCtrl($scope, $http , $location, $routeParams, socket) {
		$scope.docs = DOCS;
		console.log($scope.docs)

}


// used to test jasmine test technique..
function  DocumentCtrlJasmine($scope, $http , $sce, $location, $routeParams, renderfactory,socket,docfactory){
			return 'hello';
} 



// MISC UTILS
function urlencode(str) {
    return escape(str.replace(/%/g, '%25').replace(/\+/g, '%2B')).replace(/%25/g, '%');
}

function serialize(obj, prefix) {
  var str = [];
  for(var p in obj) {
    var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
    str.push(typeof v == "object" ?
      serialize(v, k) :
      encodeURIComponent(k) + "=" + encodeURIComponent(v));
  }
  return str.join("&");
}



DocumentNewCtrl.$inject = ['$scope', '$http' , 'docfactory'];

