//
//  Join.swift
//  HeresAFilm
//
//  Created by Niall Rooney on 06/02/2023.
//

import SwiftUI

struct Join: View {
    @StateObject private var viewModel = JoinViewModel()
    var body: some View {
        ZStack {
            VStack {
                EnterTextfield(title: "Email Address", description: "Enter Email Address", text: $viewModel.emailAddress)
                EnterTextfield(title: "Username", description: "Enter a Username", text: $viewModel.userName)
                Passwordfield(title: "Password", description: "Enter a Password", text: $viewModel.password)
                Passwordfield(title: "Confirm Password", description: "Re-enter Password", text: $viewModel.confirmPassword)
                Text("Date Of Birth")
                    .font(.system(size: 13, weight: .light))
                    .foregroundColor(.secondary)
                    .frame(maxWidth: .infinity,maxHeight: 15, alignment: .leading)
                DatePicker("Date of Birth", selection: $viewModel.dateOfBirth, displayedComponents: .date)
                    .foregroundColor(.secondary)
                    .datePickerStyle(.automatic)
                    .padding(10)
                    .border(Color.blue, width: 5)
                Button {
                    
                } label: {
                    Text("Sign Up")
                        .foregroundColor(.white)
                        .fontWeight(.bold)
                        .background(Capsule()
                            .fill(.blue)
                            .frame(width: 200, height: 40))
                }.padding(.top, 40)
                Button {
                    // takes user to forget password screen
                } label: {
                    Text("Forgot Password")
                        .font(.footnote)
                        .underline()
                }
                .padding(8)
            }
            .padding()
        }.ignoresSafeArea()
    }
}

struct Join_Previews: PreviewProvider {
    static var previews: some View {
        Join()
    }
}
