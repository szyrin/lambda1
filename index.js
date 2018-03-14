'use strict';
var AWS = require('aws-sdk');

var elasticTranscoder = new AWS.ElasticTranscoder({
    region: 'eu-west-1'
});

exports.handler = function(event, context, callback){
    console.log('function start');

    var key = event.Records[0].s3.object.key;

    //replace spaces with '+'
    var sourceKey = decodeURIComponent(key.replace(/\+/g, ' '));

    //remove the extension
    var outputKey = sourceKey.split('.')[0];

    var params = {
        PipelineId: '1520977321815-jnm7jx',
        Input: {
            Key: sourceKey
        },
        Outputs: [
            {
                Key: outputKey + '-1080p' + '.mp4',
                PresetId: '1351620000001-000001' //Generic 1080p
            },
            {
                Key: outputKey + '-720p' + '.mp4',
                PresetId: '1351620000001-000010' //Generic 720p
            },
            {
                Key: outputKey + '-web-720p' + '.mp4',
                PresetId: '1351620000001-100070' //Web Friendly 720p
            }
        ]};

    console.log(params);

    elasticTranscoder.createJob(params, function(error, data){
        if (error){
            callback(error);
        }
    });
};