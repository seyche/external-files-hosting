$(document).ready(function() {    
    
    var $container = $("section"); 
    var filters = {}; 
 
    var $grid = $container.isotope({
        itemSelector: "article", 
        percentPosition: false,
        layoutMode: 'masonry',
        masonry: {
           columnWidth: 250,
           horizontalOrder: true,
           fitWidth: true,
           gutter: 50
        }
     });
     
     $grid.imagesLoaded().progress( function() {
        $grid.isotope('layout');
    });
 
     $(".option-set a").click(function(e) {
        var $this = $(this);
        var filterAttr = "data-filter-value";
        var filterValue = $this.attr(filterAttr); 
        var $optionSet = $this.parents(".option-set"); 
        var group = $optionSet.attr("data-filter-group"); 
        var filterGroup = filters[group];
        if (!filterGroup) {
            filterGroup = filters[group] = [];
        }
        var $selectAll = $optionSet.find('a['+filterAttr+'=""]'); 
        var activeClass = "selected", 
        exclClass = "exclusive";
        comboFiltering($this,filters,filterAttr,filterValue,$optionSet,group,$selectAll,activeClass,exclClass);
        var comboFilter = getComboFilter(filters);
        $grid.isotope({
            filter: comboFilter
        });
        $this.toggleClass(activeClass);
        e.preventDefault();
    });
 
    /// SLIDE-IN DESCRIPTION 
    
    $('.more').click(function(){
         $(this).closest('article').find('.popup').toggleClass('slide-in');
         $(this).toggleClass('more-clicked');
         $(this).closest('article').toggleClass('item-active');
    });
 
});

/// TOOLTIPS
 
tippy('[title]', {
    theme: 'custom',
    arrow: false,
    followCursor: true,
    delay: 100,
    placement: 'bottom-start',
    zIndex: 9999999999,
    maxWidth: 400,
 
    content(reference) {
         const title = reference.getAttribute('title');
         reference.removeAttribute('title');
         return title;
    },
});
