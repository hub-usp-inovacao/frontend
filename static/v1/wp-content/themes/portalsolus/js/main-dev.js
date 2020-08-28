
    $(document).ready(function(){

      console.log('main-dev');

    for(var i = 0; i <= 7; i++){
      //$('.cards-' + i + ':eq(0) .categoria-titulo').css('display','block');
      $('.cards-' + i + ':visible').eq(0).children('.grid-item-content').children('.categoria-titulo').css('display','block');
    }



    $('.botao-red').click(function(){
      console.log('oi');

      $('.is-expanded').removeClass('is-expanded');


      $('.grid-item-hidden').removeClass('grid')
      //$grid.isotope('reloadItems').isotope('layout');

      console.log('tchau');

    });

    $('.slider').bxSlider({ pager : false, adaptiveHeight : true});


    $('.menu li a').click(function(e){

      var page = $(this).attr('href').replace('#','');

      console.log($('.'+page).offset().top);

      $('html, body').animate({
        scrollTop: $('.'+page).offset().top
      }, 500);
    })

    /*
    $('.verfiltro').click(function(){
      $(this).toggleClass('verfiltro-menos');
      $('.filtro').slideToggle();
    }) */

    $('.vertags').click(function(){
      $(this).toggleClass('vertags-menos');
      $('.tags').slideToggle();
      $('.tags').toggleClass('flex');
    })










    /** empresa **/
    $('.vermais-empresa-titulo').click(function(){
      $('.overlay').fadeIn();

      $(this).parent('div').siblings('.popup').fadeIn();
    })
    $('.vermais-empresa').click(function(){
      $('.overlay').fadeIn();

      $(this).parent('div').siblings('.popup').fadeIn();
    })

    $('.open-popup-info').mouseover(function(){
      $(this).next('.popup-info').show();
    })
    $('.open-popup-info').mouseleave(function(){
      $(this).next('.popup-info').hide();
    })

    $('.popup-close').click(function(){
      $(this).parent('.popup').fadeOut();
      $('.overlay').fadeOut();
    })

    $(document).keydown(function(e) {
      if (e.keyCode === 27 ) {
        $('.popup:visible').fadeOut();
        $('.overlay').fadeOut();
      }
    })

    /** contato **/
    $('select[name="tipo-contato"]').change(function(){
      var valor = $(this).val();

      $('.tipo-contato').toggle();
    })


    // external js: isotope.pkgd.js


    var $grid = $('.grid').isotope({
      itemSelector: '.grid-item'
    });

/* $grid.on( 'click', '.grid-item-content', function( event ) {
  $( event.currentTarget ).parent('.grid-item').toggleClass('is-expanded');
  $grid.isotope();
}); */

    $('.open-box-filtros').click(function(){


      $('.box-filtros:visible').not($(this).siblings('.box-filtros')).slideUp();

      $(this).siblings('.box-filtros').slideToggle();

    })

    /* nova busca */

    var busca = false;

    var buscaCategoria = false;
    var buscaCampus = false;
    var buscaUnidade = false;

    var buscaAreaDeConhecimento = false;

    var buscaTipoDeConteudo = false;
    var buscaPublico = false;

    var buscaIncubadora = false;
    var buscaTecnologia = false;
    var buscaCNAE = false;




    $('.search').submit(function(e){

      var texto = $('[name="search"]').val().toLowerCase();

      console.clear();

      e.preventDefault();

      if(!$('[name="search"]').val()){

        console.log('nao tem texto');

        if(busca.length == 0){
          console.log('busca vazio');
        }
        else{
          $('.grid-item-visible').removeClass('grid-item-visible');

          $('.cards').each(function(i, item){


                  var count = 0;
                  var buscaCampos = [];
                  var buscaCamposContador = 0;

                  for(var i= busca.length-1; i>=0; i--){
                      var buscaName = busca[i].split('---')[0];
                      var buscaValor = busca[i].split('---')[1];

                        if($(item).data(buscaName).indexOf(buscaValor) > -1 ){
                          count++;
                        }

                        if((buscaCampos.indexOf(buscaName) > -1) && (buscaName != 'tipodeconteudo')){
                          count++;
                        }
                        else{

                        }



                      if(count == busca.length){
                        $(item).addClass('grid-item-visible');
                      }

                      buscaCampos.push(buscaName);

                  }

                  console.log(i + ' ' + buscaCampos);

          })


          $grid.isotope({ filter : '.grid-item-visible'});

          $('.categoria').each(function(i, item){
            if($(item).children('div').children('.grid-item-visible').length == 0){
              $(item).addClass('hide');
            }
            else{
              $(item).removeClass('hide');
            }
          })

          if(busca.length == 0){
            $('.hide').removeClass('hide');

            $grid.isotope({filter: '*'});
          }
          else{
            if($('.grid-item-visible').length == 0){
              $('.semresultados').fadeIn();
            }
          }

        }


      }
      else{
      console.log('tem texto');

      $('.semresultados').hide();
      $('.categoria').show();

      //$('.grid-item-visible').removeClass('grid-item-visible');


              //if($('.grid-item-visible').length == 0){
              if(busca.length == 0){
                console.log('busca vazio');
                $('.cards').each(function(i, item){
                  var count = 0;
                  var datasArray = $(item).data();

                  for( const dataValue of Object.keys(datasArray)){
                    var valor = datasArray[dataValue].toString().toLowerCase();

                    if(valor.indexOf(texto) != -1){
                      count++;
                    }
                    else{

                    }

                  }

                  console.log(count);
                  if(count > 0){
                      $(item).addClass('grid-item-visible');
                    }

                })
              }
              else{
                console.log('busca preenchida');
                $('.grid-item-visible').removeClass('grid-item-visible');




                $('.cards').each(function(i, item){
                        var count = 0;
                        var buscaCampos = [];
                        var buscaCamposContador = 0;

                        for(var i= busca.length-1; i>=0; i--){
                            var buscaName = busca[i].split('---')[0];
                            var buscaValor = busca[i].split('---')[1];

                              if($(item).data(buscaName).indexOf(buscaValor) > -1 ){
                                count++;
                              }

                              if((buscaCampos.indexOf(buscaName) > -1) && (buscaName != 'tipodeconteudo')){
                                count++;
                              }
                              else{

                              }



                            if(count == busca.length){
                              $(item).addClass('grid-item-visible');
                            }

                            buscaCampos.push(buscaName);

                        }


                })


                $grid.isotope({ filter : '.grid-item-visible'});

                $('.categoria').each(function(i, item){
                  if($(item).children('div').children('.grid-item-visible').length == 0){
                    $(item).addClass('hide');
                  }
                  else{
                    $(item).removeClass('hide');
                  }
                })

                if(busca.length == 0){
                  $('.hide').removeClass('hide');

                  $grid.isotope({filter: '*'});
                }
                else{
                  if($('.grid-item-visible').length == 0){
                    $('.semresultados').fadeIn();
                  }
                }




                $('.cards.grid-item-visible').each(function(i, item){
                  var count = 0;
                  var datasArray = $(item).data();

                  for( const dataValue of Object.keys(datasArray)){
                    var valor = datasArray[dataValue].toLowerCase();

                    if(valor.indexOf(texto) != -1){
                      count++;
                    }
                    else{

                    }

                  }

                  console.log(count);
                  if(count == 0){
                      $(item).removeClass('grid-item-visible');
                    }

                })
              }



        $grid.isotope({ filter: '.grid-item-visible' });

        /*
          if($('.filtro input[type="text"]') != ''){

            $('.categoria').each(function(i, item){
              if($(item).children('.grid').children('.cards.grid-item-visible').length == 0){
                $(item).fadeOut();
              }
            });

          }

          if($('.grid-item-visible').length == 0){
            $('.semresultados').fadeIn();
          } */

        }

    });
















    var busca = [];
    //var palavras = [];

    $('.box-filtros input[type="checkbox"]').click(function(){

      $('.semresultados').hide();
      console.clear();

      $('[name="search"]').val('');

      $('.cards').removeClass('grid-item-visible');


      var palavra = $(this).val();
      var name = $(this).attr('name');


      if($(this).is(':checked')){

        busca.push(name + '---' + palavra); //insere na busca

      }
      else{

        for(var i= busca.length-1; i>=0; i--){
          if (busca[i] === (name + '---' + palavra)) {
              busca.splice(i, 1); //remove da busca
              // break;       //<-- Uncomment  if only the first term has to be removed
          }
        }

      }

      $('.cards').each(function(i, item){


              var count = 0;
              var buscaCampos = [];
              var buscaCamposContador = 0;

              for(var i= busca.length-1; i>=0; i--){
                  var buscaName = busca[i].split('---')[0];
                  var buscaValor = busca[i].split('---')[1];

                    if($(item).data(buscaName).indexOf(buscaValor) > -1 ){
                      count++;
                    }

                    if((buscaCampos.indexOf(buscaName) > -1) && (buscaName != 'tipodeconteudo')){
                      count++;
                    }
                    else{

                    }



                  if(count == busca.length){
                    $(item).addClass('grid-item-visible');
                  }

                  buscaCampos.push(buscaName);

              }

              console.log(busca);
              //console.log(i + ' ' + buscaCampos);

      })


      $grid.isotope({ filter : '.grid-item-visible'});

      $('.categoria').each(function(i, item){
        if($(item).children('div').children('.grid-item-visible').length == 0){
          $(item).addClass('hide');
        }
        else{
          $(item).removeClass('hide');
        }
      })

      if(busca.length == 0){
        $('.hide').removeClass('hide');

        $grid.isotope({filter: '*'});
      }
      else{
        if($('.grid-item-visible').length == 0){
          $('.semresultados').fadeIn();
        }
      }

    });

    $('.limpar-filtros span').click(function(){
      $('.grid-item-visible').removeClass('grid-item-visible');

      $('.categoria').show();
      $('.box-filtros').slideUp();

      $('input').prop('checked', false).val('');

      $('.semresultados').fadeOut();

      $grid.isotope({ filter : '*' });
    })

    $('.menu-icon').click(function(){
      console.log('oi');
      $('.header-mobile').toggleClass('header-fixed');
      $('.menu-mobile-nav').slideToggle();
    });

    //$('.scrollbar-inner').scrollbar();
    //$('.column').scrollbar();



    $('.vermais').click(function(){
      $(this).toggleClass('vermais-hide');

      $(this).siblings('.desc').fadeToggle();
      $(this).parent('.card').parent('.grid-item-content').parent('.grid-item').toggleClass('is-expanded');
      $grid.isotope();

    });

  });
