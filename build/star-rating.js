    var _rating_directive_ = function() {

            return (

                    {
                        template: `
<span class="star_holder" ng-repeat="star in total_stars track by $index">
  <i id="first_{{$index}}" class="fa fa-star-half first_half_star" aria-hidden="true" ng-click="star_clicked(1, $index+1)"></i>
<i id="second_{{$index}}" class="fa fa-star-half second_half_star" aria-hidden="true" ng-click="star_clicked(0.5, $index+1)"></i>
</span>`,

                        scope: {

                            rating_variable: '=onRated',
                            out_of: '=rateOutOf',
                            step: '=',
                            read_only: '=readOnly',
                            id: '@'

                        },

                        link: function(scope, el) {

                                // create an empty array and then fill it wth 1 so we can loop over it
                                scope.total_stars = [];
                                scope.total_stars.length = scope.out_of || 5;
                                scope.total_stars.fill(1);

                                function set_rating_ui(rating, star_class) {

                                    let query = `${scope.id ? `#${scope.id}.` : ''}star_rating_directive_element .fa-star-half`;

        var children = document.querySelectorAll(query);

        var stars = 0, integer_part = Math.floor(rating) , fractional_part = 0;


        if( (fractional_part = rating%1) && (fractional_part != 0)){

          if(fractional_part <= 0.3){

            fractional_part = 0;
          }
          else if(fractional_part > 0.3 && fractional_part <= 0.7){

            fractional_part = 0.5;

          }else{

            fractional_part = 1;

          }



          rating = (integer_part + fractional_part);

        }

        stars = rating > scope.out_of ? scope.out_of*2 : rating*2;
        var childrenLength = children.length;
        for (var i = 0; i < childrenLength; i++) {
          var child = children[i];
          children[i].classList.remove(star_class);
        }

        var loopTo = childrenLength - stars;
        while (childrenLength - 1 >= loopTo) {
          children[childrenLength - 1].classList.add(star_class);
          childrenLength--;
        }
      }

      // on star clicked update the rating
      scope.star_clicked = function (value, index) {

        if (scope.read_only == true) return;
        scope.rating_variable = (scope.out_of - index + value);
        set_rating_ui(scope.rating_variable,  'fill_star');
      };

      // set rating when dom is ready.
      var stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
          clearInterval(stateCheck);

          el[0].classList.add('flip_rating_holder');
          el[0].classList.add('star_rating_directive_element');

          if (!scope.read_only || scope.read_only == false) {

            el[0].classList.add('read_right_enabled');

          }else{

            set_rating_ui(5, 'default_cursor');

          }
          
          // watch changes and change ui
          scope.$watch('rating_variable', function(new_val, old_val){
            if(new_val !== undefined){
              set_rating_ui(new_val, 'fill_star')
            }
            
          })


          set_rating_ui(scope.rating_variable, 'fill_star');
        }
      }, 100);

    }
  }
  )
};


angular.module('star-rating', [])
  .directive('rating', _rating_directive_);