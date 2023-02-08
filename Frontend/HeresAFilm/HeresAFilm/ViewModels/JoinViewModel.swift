//
//  JoinViewModel.swift
//  HeresAFilm
//
//  Created by Niall Rooney on 06/02/2023.
//

import Foundation
import Alamofire

extension Join {
    @MainActor class JoinViewModel: ObservableObject {
        @Published var userName = ""
        @Published var emailAddress = ""
        @Published var password = ""
        @Published var confirmPassword = ""
        @Published var dateOfBirth = Date()
        
        func validateEmailAddress() -> Bool {
            return true
        }
        
        func validateUsername() -> Bool{
            if userName.count < 6 {
                return false
            }
            return true
        }
        
        func validatePassword() -> Bool{
            return true
        }
        
        func comparePasswords() -> Bool {
            return true
        }
        
        func textFieldValidatorEmail(_ string: String) -> Bool {
            let emailFormat = "(?:[\\p{L}0-9!#$%\\&'*+/=?\\^_`{|}~-]+(?:\\.[\\p{L}0-9!#$%\\&'*+/=?\\^_`{|}" + "~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\" + "x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[\\p{L}0-9](?:[a-" + "z0-9-]*[\\p{L}0-9])?\\.)+[\\p{L}0-9](?:[\\p{L}0-9-]*[\\p{L}0-9])?|\\[(?:(?:25[0-5" + "]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-" + "9][0-9]?|[\\p{L}0-9-]*[\\p{L}0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21" + "-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])"
            //let emailFormat = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"
            let emailPredicate = NSPredicate(format:"SELF MATCHES %@", emailFormat)
            return emailPredicate.evaluate(with: string)
        }
        
        func createUser() {
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "dd/MM/YYYY"
            let dateString = dateFormatter.string(from: dateOfBirth)
            print(dateString)
            let params: [String: Any] = [
                "username": userName,
                "email_address": emailAddress,
                "user_password": password,
                "date_of_birth": dateString]
            print(params)
            AF.request("\(API.baseURL)users", method: .post, parameters: params, encoding: JSONEncoding.default)
                .responseJSON { (response) in
                    print(response.response as Any)
                    print(response)
                }
        }
    }
}
