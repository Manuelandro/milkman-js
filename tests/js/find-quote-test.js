if (typeof require === 'function' && require.config) {
    require.config({
        baseUrl: '../lib',
        paths: {
            //Path relative to baseUrl
            'milkman': '../../milkman'
        }
    });

    //Override if in "dist" mode
    if (location.href.indexOf('-dist') !== -1) {
        //Set location of milkman to the dist location
        require.config({
            paths: {
                'milkman': '../../dist/milkman'
            }
        });
    }
}

(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD.
        define(['../../dist/milkman', 'jquery'], factory);

    } else {
        // Browser globals
        factory(root.milkman, root.jquery);
    }
}(this, function (milkman, $) {
    'use strict';



    //verifico che se passo range senza [] lo inserisce la funzione
    milkman.setInit( milkman.defaults.SETTINGS_1, function( result, moment ) {

        var object = { range:'2015-10-26'
            //range: ['2015-10-20T09:00/2015-10-20T18:30'], '2015-10-29T11:30', '2015-10-20T09:00/2015-10-20T09:30']
        };

        milkman.findQuote(object, function( best_choices ){

            var quoteNumber = 5, //numero totale di eventi che voglio generare
                quotePerDate = 2, //numero massimo di eventi con la stessa data
                overlap = false;  //gli eventi non si possono accavallare

            var results = getResults(best_choices, quoteNumber, quotePerDate, overlap);

            console.log('res: '+JSON.stringify(results));


            //console.log('tmp_best_choices: '+JSON.stringify(results));

            function getResults(best_choices, quoteNumber, quotePerDate){
                var selected_qn = 0, selected_date = [];

                return best_choices.filter(function( value ){

                    //verifico di non aver ancora raggiunto il numero di eventi necessari
                    if( selected_qn !== quoteNumber ) {
                        var to_include = true,
                            index_to_include = null;

                        selected_date.forEach( function( existingDate, index ){
                            var already_have_this_date = moment(existingDate.day).diff(moment(value.day)) === 0;

                            if( already_have_this_date ){

                                //verifico 'quotePerDate'
                                quotePerDate > selected_date[index].number ?
                                    index_to_include = index :   //non ho raggiunto il limite massimo
                                    to_include = false;          //ho raggiunto il limite massimo

                                //verifico 'overlap'
                                if( !overlap ){
                                    existingDate.ranges.forEach(function( range ){
                                        var m_val_i = moment(value.day +'T'+ value.i_bound),
                                            m_val_f = moment(value.day +'T'+ value.f_bound),
                                            m_range_i = moment(value.day +'T'+ range.split('/')[0]),
                                            m_range_f = moment(value.day +'T'+ range.split('/')[1]);

                                        var notBound_isBefore = m_val_i.diff(m_range_i) > 0 && m_val_i.diff(m_range_f) >= 0,
                                            notBound_isAfter = m_range_i.diff(m_val_f) >= 0 &&  m_range_f.diff(m_val_f) > 0;

                                        if( !notBound_isBefore || !notBound_isAfter ){
                                            to_include = false;
                                        }
                                    });
                                }
                            }
                        });

                        //aggiungo il nuovo evento
                        if( to_include ){

                            selected_qn = selected_qn + 1;

                            if( index_to_include != null ){
                                selected_date[index_to_include].number =
                                    selected_date[index_to_include].number + 1;

                                selected_date[index_to_include].ranges.push(value.range);
                            } else {
                                selected_date.push({day: value.day, number: 1, ranges:[value.range] });
                            }

                            return true;
                        }

                        console.log('selected_date: '+JSON.stringify(selected_date));
                    }
                });
            }



            test('authenticate test SETTINGS', function() {
                equal(true, true, result.text)
            });

        });

    });

}));