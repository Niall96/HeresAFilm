//
//  LogInViewModel.swift
//  HeresAFilm
//
//  Created by Niall Rooney on 08/02/2023.
//

import Foundation
import Alamofire

extension LogIn {
    @MainActor class LogInViewModel: ObservableObject {
        @Published var emailAddress = ""
        @Published var password = ""
        @Published var userExists = false
        @Published var user = User(id: 0, username: "", email_address: "")
        
        func signIn() {
            let params: [String: String] = [
                "emailAddress": emailAddress,
                "password": password
            ]
            
            AF.request("\(API.baseURL)auth", method: .post, parameters: params, encoding: JSONEncoding.default)
                .responseJSON { response in
                    if response.value != nil {
                        print(response.value!)
                        let tokens: Tokens = try! JSONDecoder().decode(Tokens.self, from: response.data!)
                        UserDefaults.standard.set(tokens.accessToken, forKey: "accessToken")
                        UserDefaults.standard.set(tokens.refreshToken, forKey: "refreshToken")
                        APIManager().getUser(email: self.emailAddress) { result in
                            if result != nil {
                                self.user = result!
                                self.userExists = true
                            }
                        }
                        
                    }
                }
        }
    }
}
