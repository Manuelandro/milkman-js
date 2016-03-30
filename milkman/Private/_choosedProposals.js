define(['moment'],

    function( moment ) {
        'use strict';

        /**
         *
         *  @PARAM:
         *  @PARAM:
         *
         */

        return function choosedProposals(best_choices, quoteNumber, quotePerDate, overlap, distribution) {
            var selected_qn = 0, selected_date = [], tmp_dist = distribution;

            return best_choices.filter(function( value ){

                //verifico di non aver ancora raggiunto il numero di eventi necessari
                if( selected_qn !== quoteNumber ) {
                    var to_include = true,
                        check_distribution = true,
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

                                    var notBound_isBefore = m_range_i.diff(m_val_i) > 0 && m_range_i.diff(m_val_f) >= 0,
                                        notBound_isAfter = m_val_i.diff(m_range_f) >= 0 &&  m_val_f.diff(m_range_f) > 0;

                                    if( !notBound_isBefore && !notBound_isAfter ){
                                        to_include = false;
                                    }
                                });
                            }

                            ////verifico 'distribution'
                            //if( to_include && tmp_dist ){
                            //    tmp_dist.forEach(function( dist, index ){
                            //        //se non ho ancora concluso gli eventi da assegnare a questo intervallo
                            //        if( dist.quote > 0 ){
                            //
                            //        }
                            //    })
                            //}

                        }
                    });

                    //aggiungo il nuovo evento
                    if( to_include && check_distribution ){

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
                }
            });
        };
    }
);