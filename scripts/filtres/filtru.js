/**
 * Created by Madalina.Lacatus on 7/7/2015.
 */
app.filter('filtru', function(){

        return function(data, search) {
            var filtered = [];
            if(search==null) return data;
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                if (angular.equals(search,item.denumire.substring(0,search.length))) {
                    filtered.push(item);
                }
            }
            return filtered;
        };

    });
