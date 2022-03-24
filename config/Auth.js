var HttpRequestHeader = Java.type("org.parosproxy.paros.network.HttpRequestHeader");
var HttpHeader = Java.type("org.parosproxy.paros.network.HttpHeader");
var URI = Java.type("org.apache.commons.httpclient.URI");

function authenticate(helper, paramsValues, credentials) {
 print("Authenticating via JavaScript script…");
 var authHelper = new OAuthAuthenticator(helper, paramsValues, credentials);
return authHelper.login();
}

function getRequiredParamsNames(){
 return ["APP_URL", "param1", "param2", "param3"];
}

function getOptionalParamsNames(){
 return ["param4"];
}

function getCredentialsParamsNames(){
 return ["username", "password"];
}

function OAuthAuthenticator(helper, paramsValues, credentials) {
this.helper = helper;
 this.loginApiUrl = paramsValues.get('APP_URL');
 this.param1 = paramsValues.get('param1');
 this.param2 = paramsValues.get('param2');
 this.param3 = paramsValues.get('param3');
 this.userName = credentials.getParam('Username');
 this.password = credentials.getParam('Password');
 
 return this;
}

OAuthAuthenticator.prototype = {
 login: function () {
 
 var loginToken,
 requestBody = 'postparam4=this.param4&postparam3=' + this.param3,
 response = this.doRequest(
 this.loginApiUrl,
 HttpRequestHeader.POST,
 requestBody
 ),
 parsedResponse = JSON.parse(response.getResponseBody().toString());
 
 if (parsedResponse.error == 'Unauthorized') {
 print('Authentication failure to ' + this.loginApiUrl + ' with : Username = ' + this.userName + ' Password = ' + this.password);
 }
 else {
 print('Authentication success. Token = ' + parsedResponse.accessToken);
 org.zaproxy.zap.extension.script.ScriptVars.setGlobalVar("logintoken",parsedResponse.accessToken)
 }
 return response;
 },
doRequest: function (url, requestMethod, requestBody) {
 var msg,
 requestUri = new URI(url, false);
 requestHeader = new HttpRequestHeader(requestMethod, requestUri, HttpHeader.HTTP10);
 requestHeader.setHeader("Authorization", "Basic "+this.param2);
msg = this.helper.prepareMessage();
 msg.setRequestHeader(requestHeader);
 msg.setRequestBody(requestBody);
 requestHeader.setContentLength(requestBody.length);
 this.helper.sendAndReceive(msg);
return msg;
 }
};