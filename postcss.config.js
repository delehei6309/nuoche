/**
 * Created by chunting on 2017/5/23.
 */
module.exports = {
    plugins: [
        require('precss'),
        require('autoprefixer')({browsers: ['last 4 versions', 'iOS 7']})
    ]
}
